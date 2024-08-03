import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

const schema = z.object({
  lesson_title: z
    .string()
    .max(60, { message: "Lesson name should be at most 60 characters" }),
  index: z.number().nonnegative({ message: "Index must be a positive number" }),
});

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const lessons = req.body;

    const { data: lessonFromDb, error: getLessonFormDbError } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("updated_at", { ascending: false });

    if (getLessonFormDbError) {
      console.error("Error fetching lessons:", getLessonFormDbError);
    } else {
      const lessonIdFromReq = req.body.map((lesson) => lesson.lesson_id);

      const lessonIdFromDb = lessonFromDb.map((lesson) => lesson.lesson_id);

      const missingInReq = lessonIdFromDb.filter(
        (lessonId) => !lessonIdFromReq.includes(lessonId)
      );

      const deleteLessonInDb = await Promise.all(
        missingInReq.map(async (lessonId) => {
          const { error: deleteLessonInDbError } = await supabase
            .from("lessons")
            .delete()
            .eq("lesson_id", lessonId);
          if (deleteLessonInDbError) {
            console.error(
              "Error deleting lesson with ID:",
              lessonId,
              deleteLessonInDbError
            );
          }
        })
      );
    }

    const results = await Promise.all(
      lessons.map(async (lesson) => {
        const validatedData = schema.safeParse(lesson);
        const upsertData = {
          lesson_title: validatedData.data.lesson_title,
          updated_at: new Date(),
          user_id: 1,
          course_id: courseId,
          index: validatedData.data.index,
        };

        if (lesson.lesson_id) {
          upsertData.lesson_id = lesson.lesson_id;
        }

        if (!lesson.lesson_id) {
          upsertData.lesson_id = lesson.lesson_id;
          upsertData.created_at = new Date();
        }

        const { data: upsertedLesson, error: upsertLessonError } =
          await supabase.from("lessons").upsert(upsertData).select();

        if (upsertLessonError) {
          console.error(upsertLessonError);
        }
        return upsertedLesson;
      })
    );
    return res.status(200).json({
      message: "Lessons have been updated successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not update lessons due to database connection",
      error: error.message,
    });
  }
}

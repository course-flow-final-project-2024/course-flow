import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

const schema = z.object({
  sub_lesson_title: z
    .string()
    .max(60, { message: "Lesson name should be at most 60 characters" }),
  sub_lesson_video: z.string().url({ message: "Invalid URL" }),
  index: z.number().nonnegative({ message: "Index must be a positive number" }),
});

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { lessonId } = req.query;

  try {
    const subLessons = req.body;

    const { data: subLessonFromDb, error: getSubLessonFormDbError } =
      await supabase.from("sub_lessons").select("*").eq("lesson_id", lessonId);

    if (getSubLessonFormDbError) {
      console.error("Error fetching lessons:", getSubLessonFormDbError);
    } else {
      const subLessonIdFromReq = req.body.map(
        (subLesson) => subLesson.sub_lesson_id
      );

      const subLessonIdFromDb = subLessonFromDb.map(
        (subLesson) => subLesson.sub_lesson_id
      );

      const missingInReq = subLessonIdFromDb.filter(
        (subLessonId) => !subLessonIdFromReq.includes(subLessonId)
      );

      const deleteLessonInDb = await Promise.all(
        missingInReq.map(async (subLessonId) => {
          const { error: deleteSubLessonInDbError } = await supabase
            .from("sub_lessons")
            .delete()
            .eq("sub_lesson_id", subLessonId);
          if (deleteSubLessonInDbError) {
            console.error(
              "Error deleting lesson with ID:",
              subLessonId,
              deleteSubLessonInDbError
            );
          }
        })
      );
    }

    const results = await Promise.all(
      subLessons.map(async (subLesson, index) => {
        const validatedData = schema.safeParse(subLesson);

        if (!validatedData.success) {
          console.error(
            `Validation failed for subLesson at index ${index}:`,
            validatedData.error
          );
        }

        const upsertData = {
          sub_lesson_title: validatedData.data.sub_lesson_title,
          updated_at: new Date(),
          user_id: 1,
          lesson_id: lessonId,
          index: validatedData.data.index,
          sub_lesson_video: validatedData.data.sub_lesson_video,
        };

        if (subLesson.sub_lesson_id) {
          upsertData["sub_lesson_id"] = subLesson.sub_lesson_id;
        }

        if (!subLesson.sub_lesson_id) {
          upsertData.created_at = new Date();
        }

        const { data: upsertedSubLesson, error: upsertSubLessonError } =
          await supabase.from("sub_lessons").upsert(upsertData).select();

        if (upsertSubLessonError) {
          console.error(upsertSubLessonError);
        }
        return upsertedSubLesson;
      })
    );
    return res.status(200).json({
      message: "Sub-lessons have been created successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create lessons due to database connection",
      error: error.message,
    });
  }
}

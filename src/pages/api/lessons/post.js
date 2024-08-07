import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

const schema = z.object({
  lesson_title: z
    .string()
    .max(60, { message: "Lesson name should be at most 60 characters" }),
  index: z.number().nonnegative({ message: "Index must be a positive number" }),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lessons = req.body.lessons;
    const courseId = req.body.course_id;

    const results = await Promise.all(
      lessons.map(async (item) => {
        const validatedData = schema.safeParse(item);
        const { data, error } = await supabase
          .from("lessons")
          .insert([
            {
              lesson_title: validatedData.data.lesson_title,
              created_at: new Date(),
              updated_at: new Date(),
              user_id: 1,
              course_id: courseId,
              index: validatedData.data.index,
            },
          ])
          .select();

        if (error) {
          console.error(error);
        }
        return data;
      })
    );
    return res.status(200).json({
      message: "Lessons have been created successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create lessons due to database connection",
      error: error.message,
    });
  }
}

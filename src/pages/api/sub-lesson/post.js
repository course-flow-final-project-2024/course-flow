import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .max(60, { message: "Lesson name should be at most 60 characters" }),
  video: z.string().url({ message: "Invalid URL" }),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const subLessons = req.body;

    const results = await Promise.all(
      subLessons.map(async (item) => {
        const lessonId = item.lesson_id;
        const validatedData = schema.safeParse(item);

        const { data, error } = await supabase
          .from("sub_lessons")
          .insert([
            {
              user_id: 1,
              sub_lesson_title: validatedData.data.name,
              lesson_id: lessonId,
              sub_lesson_video: validatedData.data.video,
              created_at: new Date(),
              updated_at: new Date(),
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
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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const subLessons = req.body;
    console.log("sub post try", subLessons);

    const results = await Promise.all(
      subLessons.map(async (item) => {
        const lessonId = item.lesson_id;
        const validatedData = schema.safeParse(item);
        console.log("sub post validated", validatedData.data);

        const { data, error } = await supabase
          .from("sub_lessons")
          .insert([
            {
              user_id: 1,
              sub_lesson_title: validatedData.data.sub_lesson_title,
              lesson_id: lessonId,
              sub_lesson_video: validatedData.data.sub_lesson_video,
              created_at: new Date(),
              updated_at: new Date(),
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
      message: "Sub-lessons have been created successfully",
      data: results,
    });
  } catch (error) {
    console.log("500", error);
    return res.status(500).json({
      message: "Server could not create lessons due to database connection",
      error: error.message,
    });
  }
}

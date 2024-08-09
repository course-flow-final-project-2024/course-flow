import { supabase } from "../../../../lib/supabase";
import { z } from "zod";
import { validationToken } from "../validation-token";

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
    const payload = await validationToken(req, res);
    const email = payload.email;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("user_id, role")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    if (user.role !== 1) {
      return res.status(401).json({ error: "Access denied. Admins only." });
    }

    const subLessons = req.body;

    const results = await Promise.all(
      subLessons.map(async (item) => {
        const lessonId = item.lesson_id;
        const validatedData = schema.safeParse(item);
        if (!validatedData.success) {
          return res.status(400).json({
            message: "Invalid input data",
            error: validatedData.error.errors,
          });
        }

        const { data, error } = await supabase
          .from("sub_lessons")
          .insert([
            {
              user_id: user.user_id,
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
          return res.status(500).json({
            message:
              "Server could not create sub-lessons due to database connection",
            error: error,
          });
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
      message: "Server could not create sub-lessons due to database connection",
      error: error,
    });
  }
}

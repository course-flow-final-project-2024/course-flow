import { supabase } from "../../../../lib/supabase";
import { z } from "zod";
import { validationToken } from "../validation-token";

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

    const lessons = req.body.lessons;
    const courseId = req.body.course_id;

    const results = await Promise.all(
      lessons.map(async (item) => {
        const validatedData = schema.safeParse(item);
        if (!validatedData.success) {
          return res.status(400).json({
            message: "Invalid input data",
            error: validatedData.error.errors,
          });
        }

        const { data, error } = await supabase
          .from("lessons")
          .insert([
            {
              lesson_title: validatedData.data.lesson_title,
              created_at: new Date(),
              updated_at: new Date(),
              user_id: user.user_id,
              course_id: courseId,
              index: validatedData.data.index,
            },
          ])
          .select();

        if (error) {
          return res.status(500).json({
            message:
              "Server could not create lessons due to database connection",
            error: error.message,
          });
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

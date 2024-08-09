import { supabase } from "../../../../lib/supabase";
import { z } from "zod";
import { validationToken } from "../validation-token";

const schema = z.object({
  assignment_title: z
    .string()
    .max(200, { message: "Assignment should be at most 200 characters" }),
  sub_lesson_id: z
    .number()
    .positive({ message: "Sub-lesson id must be a positive number" }),
  lesson_id: z
    .number()
    .positive({ message: "Lesson id must be a positive number" }),
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

    if (user.role === 1) {
      const validatedData = schema.safeParse(req.body);

      if (!validatedData.success) {
        return res.status(400).json({
          message: "Invalid input data",
          error: validatedData.error.errors,
        });
      }

      const { data, error } = await supabase
        .from("assignments")
        .insert([
          {
            ...validatedData.data,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: user.user_id,
          },
        ])
        .select();

      if (error) {
        console.error(error);
        return res.status(500).json({
          message:
            "Server could not create assignment due to database connection",
          error: error,
        });
      }

      return res.status(200).json({
        message: "Assignment has been created successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create assignment due to database connection",
      error: error.message,
    });
  }
}

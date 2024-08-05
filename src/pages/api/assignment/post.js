import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

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
    const validatedData = schema.safeParse(req.body);

    const { data, error } = await supabase
      .from("assignments")
      .insert([
        {
          ...validatedData.data,
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 1,
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
  } catch (error) {
    return res.status(400).json({
      message: "Invalid input data",
      error: error.errors || error.message,
    });
  }
}

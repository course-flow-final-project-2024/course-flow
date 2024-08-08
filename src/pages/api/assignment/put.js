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
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { assignmentId } = req.query;

  try {
    const validatedData = schema.safeParse(req.body);

    console.log("data", validatedData.data);
    console.log("id", assignmentId);

    const { data, error } = await supabase
      .from("assignments")
      .update({ ...validatedData.data, updated_at: new Date(), user_id: 1 })
      .eq("assignment_id", assignmentId)
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Server could not update assignment due to database connection",
        error: error,
      });
    }

    return res.status(200).json({
      message: "Assignment has been created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.errors || error.message,
    });
  }
}

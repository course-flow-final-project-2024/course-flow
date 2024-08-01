import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

const schema = z.object({
  course_name: z
    .string()
    .max(60, { message: "Course name should be at most 60 characters" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  duration: z
    .number()
    .positive({ message: "Duration must be a positive number" }),
  summary: z
    .string()
    .max(60, { message: "Summary should be at most 100 characters" }),
  detail: z
    .string()
    .max(1500, { message: "Detail should be at most 1,500 characters" }),
  course_image: z.string().url({ message: "Invalid URL" }),
  video_trailer: z.string().url({ message: "Invalid URL" }),
  attach_file: z.string().url().nullable({ message: "Invalid URL" }),
});

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const validatedData = schema.safeParse(req.body);
    console.log("data", validatedData.data);

    const { error } = await supabase
      .from("courses")
      .update({
        ...validatedData.data,
        updated_at: new Date(),
        user_id: 1,
      })
      .eq("course_id", courseId);

    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server could not create course due to database connection",
        error: error,
      });
    }

    return res.status(200).json({
      message: "Course has been updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid input data",
      error: error.errors || error.message,
    });
  }
}

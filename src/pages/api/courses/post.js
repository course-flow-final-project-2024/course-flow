import { supabase } from "../../../../lib/supabase";
import { z } from "zod";

const courseSchema = z.object({
  course_name: z
    .string()
    .max(60, "Course name should be at most 60 characters"),
  price: z.number().positive("Price must be a positive number"),
  duration: z.number().positive("Duration must be a positive number"),
  summary: z.string().max(100, "Summary should be at most 100 characters"),
  detail: z.string().max(1500, "Detail should be at most 1,500 characters"),
  course_image: z.string().url("Invalid URL"),
  video_trailer: z.string().url("Invalid URL").optional(),
  attach_file: z.string().url("Invalid URL").optional(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("req body", req.body);
    const validateData = courseSchema.parse(requestData);
    console.log("validat", validateData);

    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          ...validateData,
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 1,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({
        message: "Server could not create course due to database connection",
      });
    }

    return res
      .status(200)
      .json({ message: " Course has been created successfully", data });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid input data",
      error: error.errors || error.message,
    });
  }
}

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
    .max(100, { message: "Summary should be at most 100 characters" }),
  detail: z
    .string()
    .max(1500, { message: "Detail should be at most 1,500 characters" }),
  course_image: z.string().url({ message: "Invalid URL" }),
  video_trailer: z.string().url({ message: "Invalid URL" }),
  attach_file: z.string().url().nullable({ message: "Invalid URL" }),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const validatedData = schema.safeParse(req.body);
    console.log(validatedData);

    const { data, error } = await supabase
      .from("courses")
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
        message: "Server could not create course due to database connection",
      });
    }

    return res.status(200).json({
      message: " Course has been created successfully",
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid input data",
      error: error.errors || error.message,
    });
  }
}

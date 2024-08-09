import { supabase } from "../../../../lib/supabase";
import { z } from "zod";
import { validationToken } from "../validation-token";

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

      const { data: courseFromDb, error: fetchError } = await supabase
        .from("courses")
        .select("course_image, video_trailer, attach_file")
        .eq("course_id", courseId)
        .single();

      if (fetchError) {
        return res.status(500).json({ error: fetchError.message });
      }

      if (courseFromDb.course_image !== validatedData.data.course_image) {
        const coverImagepath = `cover_images/${courseFromDb.course_image
          .split("/")
          .pop()}`;
        const { error: coverImageError } = await supabase.storage
          .from("course")
          .remove([coverImagepath]);
        if (coverImageError) {
          return res.status(500).json({ error: coverImageError });
        }
      }

      if (courseFromDb.video_trailer !== validatedData.data.video_trailer) {
        const trailerPath = `trailers/${courseFromDb.video_trailer
          .split("/")
          .pop()}`;
        const { error: videoTrailerError } = await supabase.storage
          .from("course")
          .remove([trailerPath]);
        if (videoTrailerError) {
          return res.status(500).json({ error: videoTrailerError });
        }
      }

      if (courseFromDb.attach_file) {
        if (courseFromDb.attach_file !== validatedData.data.attach_file) {
          const attachmentpath = `attachments/${courseData.attach_file
            .split("/")
            .pop()}`;
          const { error: attachmentError } = await supabase.storage
            .from("course")
            .remove([attachmentpath]);

          if (attachmentError) {
            return res.status(500).json({ error: attachmentError });
          }
        }
      }

      const { error } = await supabase
        .from("courses")
        .update({
          ...validatedData.data,
          updated_at: new Date(),
          user_id: user.user_id,
        })
        .eq("course_id", courseId);

      if (error) {
        return res.status(500).json({
          message: "Server could not update course due to database connection",
          error: error,
        });
      }

      return res.status(200).json({
        message: "Course has been updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server could not update course due to database connection",
      error: error,
    });
  }
}

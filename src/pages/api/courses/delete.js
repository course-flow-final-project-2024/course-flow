import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
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
      const course_id = req.body.course_id;

      const { data: courseData, error: fetchError } = await supabase
        .from("courses")
        .select("course_image, video_trailer, attach_file")
        .eq("course_id", course_id)
        .single();

      if (fetchError) {
        console.log(fetchError);
        return res.status(500).json({ error: fetchError.message });
      }

      const coverImagepath = `cover_images/${courseData.course_image
        .split("/")
        .pop()}`;
      const { error: coverImageError } = await supabase.storage
        .from("course")
        .remove([coverImagepath]);
      if (coverImageError) {
        return res.status(500).json({ error: coverImageError });
      }

      const trailerPath = `trailers/${courseData.video_trailer
        .split("/")
        .pop()}`;
      const { error: videoTrailerError } = await supabase.storage
        .from("course")
        .remove([trailerPath]);
      if (videoTrailerError) {
        return res.status(500).json({ error: videoTrailerError });
      }

      if (courseData.attach_file) {
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

      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("course_id", course_id);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res
        .status(200)
        .json({ message: "Course has been deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
}

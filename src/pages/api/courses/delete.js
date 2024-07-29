import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }
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

  const trailerPath = `trailers/${courseData.video_trailer.split("/").pop()}`;
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

  console.log(error);
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res
    .status(200)
    .json({ message: "Course has been deleted successfully" });
}

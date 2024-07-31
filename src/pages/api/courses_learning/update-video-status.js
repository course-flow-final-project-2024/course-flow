import { supabase } from "../../../../lib/supabase";

export default async function updateVideoStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, lessonId, subLessonId, status } = req.body;

  try {
    const { error } = await supabase
      .from("user_lessons")
      .update({ sub_lesson_status_id: status })
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .eq("sub_lesson_id", subLessonId);

    if (error) {
      return res.status(400).json({ error: "Failed to update status" });
    }
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not update video status due to database connection",
    });
  }
}
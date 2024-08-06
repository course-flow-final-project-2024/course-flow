import { supabase } from "../../../../lib/supabase";

export default async function updateVideoStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, subLessonId, status } = req.body;

  try {
    const { data, error } = await supabase
      .from("user_lessons")
      .update({ sub_lesson_status_id: status })
      .eq("user_id", userId)
      .eq("sub_lesson_id", subLessonId)
      .select();

    if (error) {
      return res.status(500).json({ error: "Failed to update status" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Server could not update video status due to database connection",
    });
  }
}

import { supabase } from "../../../../lib/supabase";

export default async function updateVideoStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, lessonId, subLessonId, status } = req.body;
  console.log(req.body);

  try {
    const { data, error } = await supabase
      .from("user_lessons")
      .update({ sub_lesson_status_id: status })
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .eq("sub_lesson_id", subLessonId)
      .select();

    if (error) {
      console.error("Update error:", error.message); // Log the error for debugging
      return res.status(500).json({ error: "Failed to update status" });
    }

    return res.status(200).json(data); // Send the updated data as a response
  } catch (error) {
    console.error("Server error:", error.message); // Log the error for debugging
    return res.status(500).json({
      error: "Server could not update video status due to database connection",
    });
  }
}

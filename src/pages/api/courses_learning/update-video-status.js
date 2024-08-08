import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function updateVideoStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await validationToken(req, res);
  const { subLessonId, status } = req.body;

  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", payload.email);

    if (userError || users.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const userId = users[0].user_id;

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

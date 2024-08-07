import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const payload = await validationToken(req, res);
    const userEmail = payload.email;

    const { data: userDetail, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !userDetail) {
      return res.status(401).json({ error: "User not found" });
    }

    const userId = userDetail.user_id;

    const { error } = await supabase.from("user_courses").insert([
      {
        user_id: userId,
        course_id: courseId,
        course_progress_id: 2,
        payment_status_id: 2,
      },
    ]);

    if (error) {
      return res.status(500).json({ message: "Failed to insert data" });
    }

    return res.status(200).json({ message: "Successfully inserted data" });
  } catch (error) {
    console.error("Error inserting data", error);
    return res.status(500).json({ error: "Failed to insert data" });
  }
}

import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res
      .status(400)
      .json({ error: "User ID and Course ID are required" });
  }

  try {
    const { data, error } = await supabase.from("user_courses").insert([
      {
        user_id: userId,
        course_id: courseId,
        course_progress_id: 2,
        payment_status_id: 2,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res
      .status(200)
      .json({ message: "Successfully inserted data", data });
  } catch (error) {
    console.error("Error inserting data", error);
    return res.status(500).json({ error: "Failed to insert data" });
  }
}

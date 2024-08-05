import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const { userId, courseId } = req.query;

  if (!userId || !courseId) {
    return res
      .status(400)
      .json({ error: "User ID and course ID are required" });
  }

  try {
    const { error } = await supabase
      .from("user_courses")
      .delete()
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("payment_status_id", 2);

    if (error) {
      return res.status(500).json({
        message:
          "Server could not delete the data due to server connection problem",
      });
    }

    return res
      .status(200)
      .json({ message: "successfully deleted course from the list" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Failed to delete data" });
  }
}

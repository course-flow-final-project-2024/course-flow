import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "course ID is required" });
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

    const { error } = await supabase
      .from("user_courses")
      .delete()
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("payment_status_id", 2);

    if (error) {
      return res.status(500).json({
        message: "Failed to delete data",
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

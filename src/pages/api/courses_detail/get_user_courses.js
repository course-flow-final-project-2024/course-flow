import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  const payload = await validationToken(req, res);
  const userEmail = payload.email;

  try {
    const { data: userDetail, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !userDetail) {
      return res.status(401).json({ error: "User not found" });
    }

    const userId = userDetail.user_id;

    const { data: userCourseData, error: userCourseDataError } = await supabase
      .from("user_courses")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (userCourseDataError) {
      return res.status(500).json({
        message:
          "Server could not read the data due to server connection problem",
      });
    }

    return res.status(200).json({ userCourseData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

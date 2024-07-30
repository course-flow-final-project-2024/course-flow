import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, courseId } = req.query;

  if (!userId || !courseId) {
    return res
      .status(400)
      .json({ error: "User ID and course ID are required" });
  }

  try {
    const { data, error } = await supabase
      .from("user_courses")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (error) {
      return res.status(500).json({
        message:
          "Server could not read the data due to server connection problem",
      });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

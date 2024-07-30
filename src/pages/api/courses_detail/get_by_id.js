import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select(`*,lessons (*, sub_lessons(*))`)
      .eq("course_id", courseId);

    if (error) {
      throw error;
    }

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching course data", error);
    return res.status(500).json({
      message:
        "Server could not read the data due to server connection problem",
    });
  }
}

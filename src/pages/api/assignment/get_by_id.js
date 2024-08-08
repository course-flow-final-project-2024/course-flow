import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { assignmentId } = req.query;

  if (!assignmentId) {
    return res.status(400).json({ error: "Assignment ID is required" });
  }

  try {
    const { data: assignment, error } = await supabase
      .from("assignments")
      .select(
        "*,sub_lessons(sub_lesson_title,sub_lesson_id,lessons(lesson_id,lesson_title,courses(course_id,course_name)))"
      )
      .eq("assignment_id", assignmentId);

    if (error) {
      throw error;
    }

    if (!assignment || assignment.length === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    return res.status(200).json({ assignment });
  } catch (error) {
    console.error("Error fetching course data", error);
    return res.status(500).json({
      message:
        "Server could not read the data due to server connection problem",
    });
  }
}

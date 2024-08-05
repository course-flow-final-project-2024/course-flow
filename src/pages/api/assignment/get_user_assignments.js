import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function getUserAssignment(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const payload = await validationToken(req, res);

  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "user_id,user_assignment(*,assignments(assignment_title,sub_lesson_id,sub_lessons(sub_lesson_title,lessons(course_id,courses(course_name)))))"
      )
      .eq("email", payload.email);

    if (error || !data) {
      return res.status(400).json({ message: "Assignment not found" });
    }
    const userAssignmentData = data[0].user_assignment;
    return res.status(200).json(userAssignmentData);
  } catch (error) {
    return res.status(500).json({
      error: "Server could not read assignment due to database connection",
    });
  }
}

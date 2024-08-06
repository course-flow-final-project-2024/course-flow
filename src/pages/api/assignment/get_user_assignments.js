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
        `
      user_id,
      user_assignments (
        *,
        assignments (
          assignment_title,
          sub_lessons (
            sub_lesson_id,
            sub_lesson_title,
            lessons (
              course_id,
              courses (
                course_name
              )
            )
          )
        )
      ),
      user_lessons (
        sub_lesson_id,
        sub_lesson_status_id,
        sub_lessons (
          sub_lesson_title,
          lessons (
            course_id,
            courses (
              course_name
            )
          )
        )
      )
    `
      )
      .eq("email", payload.email);
    if (error || !data) {
      return res.status(400).json({ message: "Assignment not found" });
    }

    const userAssignmentData = data[0].user_assignments;
    const userLessonData = data[0].user_lessons;

    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Server could not read assignment due to database connection",
    });
  }
}

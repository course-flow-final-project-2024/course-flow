import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function getUserLearningCourse(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await validationToken(req, res);
  const { courseId } = req.query;

  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", payload.email);

    if (userError || users.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const userId = users[0].user_id;

    const { data: courses, error: courseError } = await supabase
      .from("user_courses")
      .select(
        `
        course_id,
        courses (
          course_name,
          detail,
          summary,
          lessons (
            lesson_id,
            lesson_title,
            index,
            sub_lessons (
              sub_lesson_id,
              lesson_id,
              sub_lesson_title,
              sub_lesson_video,
              index,
              user_lessons (
                sub_lesson_id,
                sub_lesson_status_id
              ),
              assignments (
                assignment_id,
                sub_lesson_id,
                assignment_title,
                user_assignments (
                  assignment_status_id,
                  answer,
                  assignment_status (
                    status
                  )
                )
              )
            )
          )
        )
      `
      )
      .eq("course_id", courseId)
      .eq("user_id", userId)
      .eq("payment_status_id", "1");

    if (courseError) {
      return res.status(400).json({ error: "Course not found" });
    }

    if (courses.length > 0) {
      const course = courses[0].courses;
      if (course.lessons) {
        course.lessons.forEach((lesson) => {
          if (lesson.sub_lessons) {
            lesson.sub_lessons.sort((a, b) => a.index - b.index);
          }
        });
      }
    }

    res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read courses due to database connection",
    });
  }
}

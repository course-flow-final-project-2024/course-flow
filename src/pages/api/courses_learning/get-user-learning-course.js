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
        *,
        courses (*,
          lessons (*,
            sub_lessons (*,
              user_lessons!inner (
                user_id,
                lesson_id,
                sub_lesson_id,
                user_lesson_id,
                sub_lesson_status_id
              ),
              assignments (
                assignment_id,
                sub_lesson_id,
                assignment_title,
                assignment_video,
                user_assignments!inner (
                  user_id,
                  answer,
                  assignment_status (status)
                )
              )
            )
          )
        )
      `
      )
      .eq("course_id", courseId)
      .eq("user_id", userId)
      .eq("payment_status_id", "1")
      .eq("courses.lessons.sub_lessons.user_lessons.user_id", userId);

    if (courseError) {
      return res.status(400).json({ error: "Course not found" });
    }

    if (courses.length > 0) {
      const course = courses[0].courses;
      if (course.lessons) {
        course.lessons.forEach((lesson) => {
          if (lesson.sub_lessons) {
            lesson.sub_lessons.sort((a, b) => a.index - b.index);
            lesson.sub_lessons = lesson.sub_lessons.map((subLesson) => {
              subLesson.user_lessons = subLesson.user_lessons.filter(
                (userLesson) => userLesson.user_id === userId
              );
              subLesson.assignments = subLesson.assignments.map(
                (assignment) => {
                  assignment.user_assignments =
                    assignment.user_assignments.filter(
                      (userAssignment) => userAssignment.user_id === userId
                    );
                  return assignment;
                }
              );
              return subLesson;
            });
          }
        });
      }
    }

    res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read courses due to database connection error",
    });
  }
}

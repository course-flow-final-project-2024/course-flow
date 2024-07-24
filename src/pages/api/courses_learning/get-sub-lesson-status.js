import { supabase } from "../../../../lib/supabase";

export default async function getSubLessonStatus(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, courseId } = req.query;

  try {
    const { data: courses, error } = await supabase
      .from("user_courses")
      .select(
        "course_id, courses(detail, summary, lessons (lesson_id, lesson_title, sub_lessons(sub_lesson_title, user_lessons(sub_lesson_status_id))))"
      )
      .eq("course_id", courseId, "user_id", userId, "payment_status_id", "1");

    if (error) {
      return res.status(400).json({ error: "Course not found" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read courses due to database connection",
    });
  }
}

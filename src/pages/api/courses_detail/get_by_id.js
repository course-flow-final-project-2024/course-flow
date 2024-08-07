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

  try {
    const payload = await validationToken(req, res);
    const email = payload.email;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("user_id, role")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    if (user.role !== 1) {
      return res.status(401).json({ error: "Access denied. Admins only." });
    }

    if (user.role === 1) {
      const { data: courses, error } = await supabase
        .from("courses")
        .select(`*,lessons (*, sub_lessons(*))`)
        .eq("course_id", courseId)
        .order("updated_at", { ascending: false })
        .order("index", { referencedTable: "lessons", ascending: true });

      if (error) {
        throw error;
      }

      if (!courses || courses.length === 0) {
        return res.status(404).json({ error: "Course not found" });
      }

      if (courses.length > 0) {
        const course = courses[0];

        if (course.lessons) {
          course.lessons.map((lesson) => {
            if (lesson.sub_lessons) {
              lesson.sub_lessons.sort((a, b) => a.index - b.index);
            }
          });
        }
      }

      return res.status(200).json({ courses });
    }
  } catch (error) {
    console.error("Error fetching course data", error);
    return res.status(500).json({
      message:
        "Server could not read the data due to server connection problem",
    });
  }
}

import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
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
      const {
        search,
        currentPage: rawCurrentPage,
        limit: rawLimit,
      } = req.query;

      const currentPage = parseInt(rawCurrentPage, 10) || 1;
      const limit = parseInt(rawLimit, 10) || 12;
      const offset = (currentPage - 1) * limit;

      let assignmentsQuery = supabase
        .from("assignments")
        .select(
          "*,sub_lessons(sub_lesson_title,lessons(lesson_title,courses(course_name)))"
        )
        .order("updated_at", { ascending: false });

      const { data: allAssignment, error: totalAssignmentError } =
        await assignmentsQuery;

      if (totalAssignmentError) {
        console.error("Error fetching assignments: ", totalAssignmentError);
        return res.status(500).json({
          message:
            "Server could not read assignments due to database connection",
        });
      }

      let filteredAssignments = allAssignment;

      if (search) {
        const searchLower = search.toLowerCase();

        filteredAssignments = filteredAssignments.filter((assignment) => {
          const subLesson = assignment.sub_lessons;
          if (subLesson) {
            const subLessonTitle = subLesson.sub_lesson_title.toLowerCase();

            if (subLessonTitle.includes(searchLower)) {
              return true;
            }

            const lesson = subLesson.lessons;
            const lessonTitle = lesson.lesson_title.toLowerCase();
            if (lessonTitle.includes(searchLower)) {
              return true;
            }

            const course = lesson.courses;

            const courseName = course.course_name.toLowerCase();
            if (courseName.includes(searchLower)) {
              return true;
            }
          }

          return false;
        });
      }

      const totalItems = filteredAssignments.length;

      if (totalItems === 0) {
        return res
          .status(200)
          .json({ assignments: [], totalItems: 0, totalPages: 0, currentPage });
      }

      const paginatedAssignments = filteredAssignments.slice(
        offset,
        offset + limit
      );

      const totalPages = Math.ceil(totalItems / limit);
      const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

      return res.status(200).json({
        assignments: paginatedAssignments,
        totalItems,
        totalPages,
        currentPage: safeCurrentPage,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
}

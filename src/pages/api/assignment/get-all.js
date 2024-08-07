import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { search, currentPage: rawCurrentPage, limit: rawLimit } = req.query;

  const currentPage = parseInt(rawCurrentPage, 10) || 1;
  const limit = parseInt(rawLimit, 10) || 12;
  const offset = (currentPage - 1) * limit;

  let assignmentsQuery = supabase
    .from("assignments")
    .select(
      "*,sub_lessons(sub_lesson_title,lessons(lesson_title,courses(course_name)))"
    )
    .order("updated_at", { ascending: false });

  // if (search) {
  // const searchQuery = `sub_lessons.sub_lesson_title.ilike.%${search}%,sub_lessons.lessons.lesson_title.ilike.%${search}%,sub_lessons.lessons.courses.course_name.ilike.%${search}%`;
  // const formattedSearchQuery = searchQuery.replace(/\s+/g, "");
  // assignmentsQuery = assignmentsQuery.or(formattedSearchQuery);
  // assignmentsQuery = assignmentsQuery.or(
  //   `sub_lesson_title.ilike.%${search}%`,
  //   {
  //     referencedTable: "sub_lessons",
  //   }
  // );
  //.ilike(
  //   "sub_lesson_title",
  //   `%${search}%`
  // );
  // .or(`lessons.lesson_title.ilike.%${search}%`, {
  //   referencedTable: "lessons",
  // });
  // assignmentsQuery = assignmentsQuery.or(
  //   `sub_lessons.sub_lesson_title.ilike.%${search}%`
  // lessons.lesson_title.ilike.%${search}%,sub_lesson_title.ilike.%${search}%`
  //);
  // s

  const { data: allAssignment, error: totalAssignmentError } =
    await assignmentsQuery;

  if (totalAssignmentError) {
    console.error("Error fetching assignments: ", totalAssignmentError);
    return res.status(500).json({
      message: "Server could not read assignments due to database connection",
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

  // let paginatedQuery = assignmentsQuery.range(offset, offset + limit - 1);
  // const { data: assignments, error: paginatedError } = await paginatedQuery;

  // if (paginatedError) {
  //   return res.status(500).json({
  //     message: "Server could not read assignments due to database connection",
  //   });
  // }

  const totalPages = Math.ceil(totalItems / limit);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  return res.status(200).json({
    assignments: paginatedAssignments,
    totalItems,
    totalPages,
    currentPage: safeCurrentPage,
  });
}

import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { search, currentPage: rawCurrentPage, limit } = req.query;
  const currentPage = parseInt(rawCurrentPage, 10) || 1;
  const offset = (currentPage - 1) * limit;

  let coursesQuery = supabase
    .from("courses")
    .select("*, lessons(count)")
    .order("updated_at", { ascending: false });

  if (search) {
    coursesQuery = coursesQuery.ilike("course_name", `%${search}%`);
  }

  const totalCourse = await coursesQuery;
  const totalItems = totalCourse.data.length;
  console.log(totalCourse.data.length);

  if (totalItems === 0) {
    return res
      .status(200)
      .json({ courses: [], totalItems: 0, totalPages: 0, currentPage });
  }

  if (totalItems === 0) {
    return res
      .status(200)
      .json({ courses: [], totalItems: 0, totalPages: 0, currentPage });
  }

  let { data: courses, error } = await coursesQuery.range(
    offset,
    offset + limit - 1
  );

  if (error) {
    return res.status(500).json({
      message: "Server could not read courses due to database connection",
    });
  }

  const totalPages = Math.ceil(totalItems / limit);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  return res
    .status(200)
    .json({ courses, totalItems, totalPages, currentPage: safeCurrentPage });
}

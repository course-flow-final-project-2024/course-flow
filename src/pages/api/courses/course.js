import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { search, currentPage, limit } = req.query;
  const offset = (currentPage - 1) * limit;

  let coursesQuery = supabase.from("courses").select("*, lessons(count)");

  if (search) {
    coursesQuery = coursesQuery.filter("course_name", "ilike", `%${search}%`);
  }

  const totalCourse = await coursesQuery;
  const totalItems = totalCourse.data.length;

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

  return res.status(200).json({ courses, totalItems, totalPages, currentPage });
}

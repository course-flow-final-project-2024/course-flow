import { supabase } from "../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title } = req.query;

  let query = supabase.from("courses").select("*, lessons(count)");

  if (title) {
    query = query.ilike("course_name", `%${title}%`);
  }

  let { data: courses, error } = await query;

  // let { data: courses, error } = await supabase
  //   .from("courses")
  //   .select("*, lessons(count)");

  if (error) {
    return res.status(500).json({ error: "Failed to fetch courses" });
  }

  res.status(200).json({ courses });
}

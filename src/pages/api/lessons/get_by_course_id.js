import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res
      .status(400)
      .json({ error: "Missing or invalid courseId parameter" });
  }

  let { data: lessons, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("index", { ascending: true });

  if (error) {
    return res.status(500).json({
      message: "Server could not read lessons due to database connection",
    });
  }

  return res.status(200).json({ lessons });
}

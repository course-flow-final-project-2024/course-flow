import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lessonId } = req.query;

  if (!lessonId) {
    return res
      .status(400)
      .json({ error: "Missing or invalid courseId parameter" });
  }

  let { data: subLessons, error } = await supabase
    .from("sub_lessons")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("index", { ascending: false });

  if (error) {
    return res.status(500).json({
      message: "Server could not read sub-lessons due to database connection",
    });
  }

  return res.status(200).json({ subLessons });
}

import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  const { courseId } = req.query;

  const { data: courses, error } = await supabase
    .from("courses")
    .select(`*,lessons (*, sub_lessons(*))`)
    .eq("course_id", courseId);

  res.status(200).json({ courses });
}

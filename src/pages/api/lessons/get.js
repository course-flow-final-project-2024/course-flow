import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let { data: lessons, error } = await supabase
    .from("lessons")
    .select("*, sub_lessons(count)")
    .order("updated_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      message: "Server could not read courses due to database connection",
    });
  }

  return res.status(200).json({ lessons });
}

import { supabase } from "../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    return res.status(500).json({ error: "Failed to fetch courses" });
  }

  res.status(200).json({ courses });
}

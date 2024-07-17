import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data: courses, error: errorOccurs } = await supabase
    .from("courses")
    .select(`*, lessons(count)`);

  if (errorOccurs) {
    res.status(500).json({
      message:
        "Server could not read the data due to server connection problem",
    });
  }

  res.status(200).json({ courses });
}

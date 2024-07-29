import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("user_courses")
      .select("*, courses (*, lessons(count))")
      .eq("user_id", userId)
      .eq("payment_status_id", 2);

    if (error) {
      throw error;
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not read the data due to server connection problem",
    });
  }
}

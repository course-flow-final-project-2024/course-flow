import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function getAllAssignmentStatus(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await validationToken(req, res);

  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", payload.email);

    if (userError || users.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const userId = users[0].user_id;

    const { data: assignments, error: assignmentError } = await supabase
      .from("user_assignments")
      .select(`*,assignment_status(*)`)
      .eq("user_id", userId);

    if (assignmentError) {
      return res.status(400).json({ error: "Assignment not found" });
    }

    res.status(200).json({ assignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return res.status(500).json({
      message: "Server could not get assignments due to database connection",
    });
  }
}

import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function updateAssignmentStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await validationToken(req, res);
  const { assignmentId, status, assignmentAnswer } = req.body;

  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", payload.email);

    if (userError || users.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const userId = users[0].user_id;

    const { data, error } = await supabase
      .from("user_assignments")
      .update({ assignment_status_id: status, answer: assignmentAnswer })
      .eq("user_id", userId)
      .eq("assignment_id", assignmentId)
      .select();

    if (error) {
      return res.status(500).json({ error: "Failed to update status" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No matching assignment found" });
    }

    return res.status(200).json({
      message: "Assignment status updated successfully",
      updatedAssignment: data,
    });
  } catch (error) {
    return res.status(500).json({
      error:
        "Server could not update assignment status due to database connection",
    });
  }
}

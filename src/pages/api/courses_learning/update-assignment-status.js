import { supabase } from "../../../../lib/supabase";

export default async function updateVideoStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, assignmentId, status, assignmentAnswer } = req.body;

  try {
    const { data, error } = await supabase
      .from("user_assignment")
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

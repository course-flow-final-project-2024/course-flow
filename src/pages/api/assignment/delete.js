import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const assignment_id = req.body.assignment_id;

  const { error } = await supabase
    .from("assignments")
    .delete()
    .eq("assignment_id", assignment_id);
  console.log(error);
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res
    .status(200)
    .json({ message: "ASsignment has been deleted successfully" });
}

import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const payload = await validationToken(req, res);
    const email = payload.email;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("user_id, role")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    if (user.role !== 1) {
      return res.status(401).json({ error: "Access denied. Admins only." });
    }

    if (user.role === 1) {
      const assignment_id = req.body.assignment_id;

      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("assignment_id", assignment_id);

      if (error) {
        return res.status(500).json({
          message:
            "Server could not delete assignment due to database connection",
          error: error.message,
        });
      }

      return res
        .status(200)
        .json({ message: "Assignment has been deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server could not delete assignment due to database connection",
      error: error.message,
    });
  }
}

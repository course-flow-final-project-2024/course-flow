import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";

export default async function handler(req, res) {
  if (req.method !== "GET") {
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

    const { lessonId } = req.query;

    if (!lessonId) {
      return res
        .status(400)
        .json({ error: "Missing or invalid courseId parameter" });
    }

    let { data: subLessons, error } = await supabase
      .from("sub_lessons")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("index", { ascending: true });

    if (error) {
      return res.status(500).json({
        message: "Server could not read sub-lessons due to database connection",
      });
    }

    return res.status(200).json({ subLessons });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read sub-lessons due to database connection",
    });
  }
}

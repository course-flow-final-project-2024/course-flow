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
      const lesson_id = req.body.lesson_id;

      const { data: subLessons, error: fetchError } = await supabase
        .from("sub_lessons")
        .select("sub_lesson_video")
        .eq("lesson_id", lesson_id);

      if (fetchError) {
        return res.status(500).json({ error: fetchError.message });
      }

      subLessons.map(async (item) => {
        const filePath = `sub_lessons/${item.sub_lesson_video
          .split("/")
          .pop()}`;

        const { error: error } = await supabase.storage
          .from("course")
          .remove([filePath]);

        if (error) {
          return res.status(500).json({ error: error });
        }
      });

      const { error } = await supabase
        .from("lessons")
        .delete()
        .eq("lesson_id", lesson_id);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res
        .status(200)
        .json({ message: "Lesson has been deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

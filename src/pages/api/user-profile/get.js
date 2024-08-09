import { supabase } from "../../../../lib/supabase";
import { validationToken } from "../validation-token";
export default async function getProfile(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const payload = await validationToken(req, res);

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", payload.email)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Get profile successful",
      user: {
        name: user.name,
        image: user.image_user,
        birthday: user.birthday,
        education: user.education_bg,
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
}

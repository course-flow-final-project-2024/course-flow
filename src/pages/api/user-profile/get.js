import { supabase } from "../../../../lib/supabase";

export default async function getProfile(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Not authorized" });
  }

  try {
    const { data: session, error: sessionError } = await supabase
      .from("loginsession")
      .select("user_email")
      .eq("sessionId", token)
      .single();

    if (sessionError) {
      throw new Error(sessionError);
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user_email)
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
      },
    });
  } catch (error) {
    console.error("Error signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
}

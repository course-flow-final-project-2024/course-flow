import { supabase } from "../../../../lib/supabase";

export default async function getProfile(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Not authorized" });
  }

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("email, name, image_user")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Get profile successful",
      user: { name: user.name, image: user.image_user },
    });
  } catch (error) {
    console.error("Error signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
}

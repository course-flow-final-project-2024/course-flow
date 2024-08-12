import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    if (user.role !== 2) {
      return res.status(401).json({ error: "Failed to sign in" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data) {
      return res.status(401).json({ error: error.message || "Login failed" });
    }
    return res
      .status(200)
      .json({ message: "Login successful", token: data.session.access_token });
  } catch (error) {
    console.error("Error signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
}

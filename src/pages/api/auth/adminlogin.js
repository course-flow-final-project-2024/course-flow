import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required" });
  }

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("email, password")
      .eq("name", name)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: "Name not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    return res
      .status(200)
      .json({ message: "Login successful", user: { name, email: user.email } });
  } catch (error) {
    console.error("Error signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
}

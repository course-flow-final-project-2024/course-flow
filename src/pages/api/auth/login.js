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
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !user) {
      return res.status(401).json({ error: error.message || "Login failed" });
    }

    
    const session = await supabase.from("loginsession").insert({user_email: user.email}).select()
  
    
    if (session.error) {
      throw new Error(session.error)
    }

    return res.status(200).json({ message: "Login successful",  token: session.data[0].sessionId });
  } catch (error) {
    console.error("Error signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
}

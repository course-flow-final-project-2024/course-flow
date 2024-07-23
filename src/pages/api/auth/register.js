import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, birthday, education_bg, email, password } = req.body;

  if (!name || !birthday || !education_bg || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data: signUp, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !signUp.user) {
      return res.status(400).json({ error: signUpError.message });
    }

    const user = signUp.user;

    const { error: insertError } = await supabase
      .from("users")
      .insert([{ name, birthday, education_bg, email, password, role: 2 }]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(200).json({ message: "Registration successful", user });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Failed to register" });
  }
}

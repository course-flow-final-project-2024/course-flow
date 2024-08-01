import { supabase } from "../../../../lib/supabase";
import bcrypt from "bcrypt";

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
      return res
        .status(400)
        .json({
          message: "Error occurred during create authenticate user account",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const { data, error: insertError } = await supabase.from("users").insert([
      {
        name,
        birthday,
        education_bg,
        email,
        password: hashPassword,
        role: 2,
      },
    ]);

    if (insertError) {
      return res
        .status(400)
        .json({ message: "Error occurred during create user information" });
    }

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Failed to register" });
  }
}

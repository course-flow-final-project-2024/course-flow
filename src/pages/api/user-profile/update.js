import { supabase } from "./../../../../lib/supabase";

export default async function updateProfile(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: "Not authorized" });
  }

  try {
    const { data: session, error: sessionError } = await supabase
      .from("loginsession")
      .select("user_email")
      .eq("sessionId", token)
      .single();

    if (sessionError || !session || !session.user_email) {
      throw new Error(sessionError.message || "Session not valid");
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user_email)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    const { name, email, education_bg, birthday, image } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (education_bg) updates.education_bg = education_bg;
    if (birthday) updates.birthday = birthday;
    if (image) updates.image_user = image;

    // if ((object, key(updates).length === 0)) {
    //   return res.status(400).json({ error: "No fields to update" });
    // }
    const { error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("email", session.user_email);

    if (updateError) {
      throw new Error(userError.message);
    }

    const { data: updatedUser, error: updatedUserError } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user_email)
      .single();

    if (updatedUserError) {
      throw new Error(updatedUserError.message);
    }

    return res
      .status(200)
      .json({ message: "profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error update profile:", error.message);
    return res.status(500).json({ error: "Failed to update" });
  }
}

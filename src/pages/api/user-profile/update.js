import { supabase } from "./../../../../lib/supabase";
import { validationToken } from "../validation-token";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

export default async function updateProfile(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const payload = await validationToken(req, res);
  if (!payload) {
    return res.status(400).json({ error: "Not authorized" });
  }

  try {
    const { name, email, education_bg, birthday, image } = req.body;

    if (email) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(payload.sub, {
        email: email,
      });

      if (authError) {
        throw new Error(`Error updating email in Auth: ${authError.message}`);
      }

    }

    
      const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (education_bg) updates.education_bg = education_bg;
    if (birthday) updates.birthday = birthday;
    if (image) updates.image_user = image;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const { error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("email", payload.email)

    if (updateError) {
      throw new Error(updateError.message);
    }
    
    const { data: updatedUser, error: updatedUserError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (updatedUserError) {
      throw new Error(updatedUserError.message);
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ error: "Failed to update" });
  }
}

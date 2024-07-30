
import { supabase } from "./../../../../lib/supabase";
import { uploadProfilePicture } from "@/components/user-profile/ีupdate-user-image";

export default async function updateProfile(req, res) {
  
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization

  if (!token) {
    return res.status(400).json({ error: "Not authorized" });
  }

  const {  name, email, education_bg, birthday, profilePicture } = req.body;

  try {
    const { data: session , error: sessionError } = await supabase
      .from("loginsession")
      .select("user_email")
      .eq("sessionId", token)
      .single();

    if (sessionError || !session || !session.user_email) {
      console.log("A")
      throw new Error(sessionError.message || "Session not valid");
    }

    const { data:  user , error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user_email)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    
    // if (email && email === session.user_email) {
    //   const { user: updatedAuthUser, error: authError } = await supabase.auth.updateUser({
    //     email: "email"
    //   });

    //   if (authError) {
    //     throw new Error(authError.message);
    //   }
    // }

    
    const updates = {};
    if (name) updates.name = name;
    if(email) updates.email = email;
    if(education_bg) updates.education_bg = education_bg;
    if (birthday) updates.birthday = birthday;
    if (userImage) updates.userImage = user;
    
    const { error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("email", session.user_email);

    if (updateError) {
      console.log("B")
      throw new Error(userError.message);
    }

    if (profilePicture && profilePicture.base64) {
      const { publicURL, error: uploadError } = await uploadProfilePicture(profilePicture.base64, session.user_email);

      if (uploadError) {
        throw new Error(uploadError.message);
      }


    const { error: pictureUpdateError } = await supabase
        .from("users")
        .update({ profile_picture: publicURL })
        .eq("email", session.user_email);
    
        if (pictureUpdateError) {
          throw new Error(pictureUpdateError.message);
        }
      }

    const { data: updatedUser, error: updatedUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", session.user_email)
    .single();

    if (updatedUserError) {
      console.log("C")
      throw new Error(updatedUserError.message);
    }

    return res.status(200).json({ message: "profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error update profile:", error.message);
    return res.status(500).json({ error: "Failed to update" });
  }
}

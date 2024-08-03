import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const uploadProfilePicture = async (file) => {
  try {
    const fileName = `${uuidv4}-${file.name}`;
    const filePath = `userImage/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("userProfile")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { publicURL, error: urlError } = supabase.storage
      .from("userProfile")
      .getPublicUrl(filePath);

    if (urlError) {
      throw new Error(`failed to get public URL: ${urlError.message}`);
    }
    return publicURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

import { supabase } from "./../../../lib/supabase";
import { v4 as uuidv4 } from "uuid"; 

export const uploadProfilePicture = async (file) => {
  console.log("this", file)
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  console.log("this2", fileName)
  // const fileName = `${userId}.${fileExt}`;
  const filePath = `userImage/${fileName}`;
  console.log("here22", filePath)

  const { data, error } = await supabase.storage
    .from("userProfile")
    .upload(`${filePath}`, file);

  if (error) {
    throw error;
  }

  const { publicURL, error: urlError } = supabase.storage
    .from("userProfile")
    .getPublicUrl(filePath);

  if (urlError) {
    throw urlError;
  }

  return publicURL;
};

import { supabase } from "./../../../../lib/supabase";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filePath, userEmail } = req.body;

  if (!filePath || !userEmail) {
    return res.status(400).json({ error: 'File path and user email are required' });
  }

  try {
    const { error: deleteError } = await supabase
      .storage
      .from("userProfile")
      .remove([filePath]);

    if (deleteError) {
      throw deleteError;
    }


    const { error: updateError } = await supabase
      .from("users")
      .update({ image_user: null })
      .eq("email", userEmail);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ message: 'Image deleted and database updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { filePath } = req.body;

//   if (!filePath) {
//     return res.status(400).json({ error: 'File path is required' });
//   }

//   try {

//     const filePathWithoutBaseURL = filePath.replace('https://lczppxvifxjwpejqxgoi.supabase.co/storage/v1/object/public/userProfile/', '');

//     const { error } = await supabase
//       .storage
//       .from("userProfile")
//       .remove([filePathWithoutBaseURL]);

//     if (error) {
//       throw error;
//     }

//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


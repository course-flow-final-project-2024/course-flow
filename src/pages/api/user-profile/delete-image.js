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
    console.log(`Deleting file: ${filePath} for user: ${userEmail}`);
    const fullPath = `userImage/${filePath}`;
    const { error: deleteError } = await supabase
      .storage
      .from("userProfile")
      .remove([fullPath]);

    if (deleteError) {
      console.error('Error deleting file:', deleteError.message);
      throw deleteError;
    }
    console.log('File deleted successfully');

    const { error: updateError } = await supabase
      .from("users")
      .update({ image_user: null })
      .eq("email", userEmail);

    if (updateError) {
      console.error('Error updating database:', updateError.message);
      throw updateError;
    }
    console.log('Database updated successfully');
    res.status(200).json({ message: 'Image deleted and database updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

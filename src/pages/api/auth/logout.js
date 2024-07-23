import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // let { error } = await supabase.auth.signOut();
  const {error} = await supabase.from("loginsession").delete().eq("sessionId", req.body.token)

  if (error) {
    return res
      .status(500)
      .json({ message: "Failed to logout", error: error.message });
  }
  
// const { error } = await supabase
// .from('loginsession')
// .delete()
// .eq('id', req.body.token)


  res.status(200).json({ message: "Logged out successfully" });
}

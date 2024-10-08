import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  const { token_hash, type } = req.query;

  if (type === 'signup') {
    const { data, error } = await supabase.auth.api.confirmSignUp(token_hash);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Email confirmed successfully', user: data.user });
  }

  return res.status(400).json({ error: 'Invalid confirmation type' });
}

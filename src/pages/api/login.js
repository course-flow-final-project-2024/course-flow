import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (error || !user) {
      return res.status(401).json({ error: error.message || 'Login failed' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error signing in:', error.message);
    return res.status(500).json({ error: 'Failed to sign in' });
  }
}

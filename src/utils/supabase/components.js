// File: utils/supabase/components.js
import { createClient as createBrowserClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  
  return supabaseInstance;
}

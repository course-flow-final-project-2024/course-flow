import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);

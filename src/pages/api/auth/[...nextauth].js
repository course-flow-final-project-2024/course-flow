import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    /*"
    เว้นไว้เผื่อไว้ใส่
    providerตัวอื่น"
    */
  ],
  adapter: SupabaseAdapter(supabase),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session(session, token) {
      session.user.id = token.sub;
      session.user.email = token.email;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

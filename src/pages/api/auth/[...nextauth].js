import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default NextAuth({
  providers: [
    //เงื่อนไขตัวlogin ด้วย email และ passwordน่ะคับ
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          //ถ้าเกิดว่า ไม่ได้loginด้วยข้อมุลที่regisไว้หรือข้อมุลuserในdata  ส่งerror
          throw new Error("Invalid credentials");
        }

        return { id: data.user.id, email: data.user.email };
        //ในกรณีที่ไม่เกิด error และมีข้อมูลผู้ใช้ จะทำการส่งข้อมูลกลับไปid และ email ของuserจาก data.user ออกไปเพื่อใช้งานต่อในส่วนอื่นของโปรแกรม เกบในรูปแบบ objectน่ะคับ"{ }"
      },
    }),
  ],
  adapter: SupabaseAdapter(supabase), //ดูวิธีใช้supabaseได้ในdocของnextAuth.js ในหมวด adaptersคับแล้วเลือกsupabase มันจะมีรูปแบบcoppyมาได้เลย แล้มาปรับเอา
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
/*ไลบารี่ที่ต้องติดตั้ง
 npm install next-auth
npm install @supabase/supabase-js
npm install @next-auth/supabase-adapter
npm install @next-auth/jwt
*/
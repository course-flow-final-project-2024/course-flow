// import { NextResponse } from "next/server";
// import { supabase } from "../../lib/supabase";

// export async function middleware(req) {
//     const { data: { session } } = await supabase.auth.getSession()
//     const { pathname } = req.nextUrl

//     if (session) {
//         if (pathname === "/login") {
//             return NextResponse.redirect(new URL("/", req.url))
//         }
//     } else {
//         if (pathname !== "/login" && pathname !== "/register") {
//             return NextResponse.redirect(new URL("/", req.url))
//         }
//     }
//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/', '/login', '/register', '/profile', '/other-protected-routes'],
//   };
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { supabase } from '../../lib/supabase';

// const useAuth = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const { user, session } = await supabase.auth.session();
//         if (!user || !session) {
//           if (router.pathname !== '/login' && router.pathname !== '/register') {
//             router.push('/login');
//           }
//         } else if (user && session && router.pathname === '/login') {
//           router.push('/');
//         }
//       } catch (error) {
//         console.error('Error fetching session:', error.message);
//       }
//     };

//     checkSession();

//     const authListener = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_OUT' && router.pathname !== '/login') {
//         router.push('/login');
//       } else if (event === 'SIGNED_IN' && (router.pathname === '/login' || router.pathname === '/register')) {
//         router.push('/');
//       }
//     });

//     return () => {
//       authListener?.subscription?.unsubscribe();
//     };
//   }, [router]);
// };

// export default useAuth;
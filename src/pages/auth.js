// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";

// const AuthPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Check for JWT token in localStorage (or cookies)
//     const token = localStorage.getItem("token");

//     if (token) {
//       router.push("/"); // Redirect if logged in
//     }
//   }, [router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-600">
//       <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg p-8 rounded-xl w-full max-w-md text-center border border-white/20">
//         <h2 className="text-2xl font-semibold text-white">Welcome!</h2>
//         <p className="text-white text-opacity-70 mb-6">
//           Sign in or create an account to continue
//         </p>

//         <div className="space-y-4">
//           <Link href="/signin">
//             <button className="w-full py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition">
//               Sign In
//             </button>
//           </Link>
//           <Link href="/signup">
//             <button className="w-full py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };






































// export const GET = handler;
// export const POST = handler;


















































// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth(
// {
// providers: [
// CredentialsProvider({
//   // The name to display on the sign in form (e.g. 'Sign in with...')
//   name: "email",

//   credentials: {
//     username: {
//       label: "Username",
//       type: "text",
//       placeholder: "harkirat@gmail.com",
//     },
//     password: { label: "Password", type: "password" },
//   },
//   async authorize(credentials, req) {
//     const username = credentials?.username;
//     const password = credentials?.password;
//     console.log(username);
//     console.log(password);

//     const user = {
//       name: "harkirat",
//       id: "1",
//       username: "harkirat@gmail.com",
//     };

//     if (user) {
//       return user;
//     } else {
//       return null;
//     }
//   },
// }),
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID as string,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//   }),
// ],
// secret: process.env.NEXTAUTH_SECRET,
// }

// );

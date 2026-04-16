import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";


export const authOptions: NextAuthOptions = {
  // pages:{
  //   signIn:"/signin",
  //   error:"/signin",
  // },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma)
  ,
  providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Hello@gmail.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
          
//         },
//         name:{
//           label:"Name",
//           type:"text"
//         }
//       },
//       async authorize(credentials) {
//   if (!credentials) return null;

//   let user = await prisma.user.findUnique({
//     where: { email: credentials.email as string },
//   });

//   if (!user) {
//     user = await prisma.user.create({
//       data: {
//         email: credentials.email as string,
//         name: credentials.name as string,
//         // password: hash(credentials.password)
//       },
//     });
//   }

//   return {
//     id: user.id.toString(),
//     name: user.name,
//     email: user.email,
//   };
// },
//     }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization:{
      params:{
        prompt:"consent",
        access_type:"offline",
        response_type:"code"
      }
    }
  }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
  async jwt({ token, user }: any) {
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
    }
    return token;
  },

  async session({ session, token }: any) {
    if (!session.user) session.user = {};

    session.user.email = token?.email ?? null;
    session.user.name = token?.name ?? null;

    return session;
  },
}

};

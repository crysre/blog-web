import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";


export const authOptions: NextAuthOptions = {
  
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma)
  ,
  providers: [

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
    session.user.id = token?.id;

    return session;
  },
}

};

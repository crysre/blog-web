import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Hello@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        return {
          id: "1",
          name: "Tanuj",
          email: "tamo@gmail.com",
        };
      },
    }),
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
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id =  user.id
      }
      return token
    },
    async session({session, token}){
      if(session.user){
        //@ts-ignore
        session.user.id = token.id
      }
      return session
    },
    
  },
  pages: {
    signIn: "/signin"
  }
};

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import SignOut from "./utils/SignOut";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return <div>
  {session && <div>{JSON.stringify(session)}  <SignOut/></div>}
  </div>;
}


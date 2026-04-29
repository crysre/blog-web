import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return <div className="">
  Hello "https://magicui.design/docs/components/marquee"
  </div>;
}


import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function Page(){
    
    async function createPost(formData:FormData) {
        "use server";
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error("Unauthorized");
        }

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const published = formData.get("published") === "on";
        if (!title || !content) {
      throw new Error("Missing fields");
    }
    await prisma.blog.create({
      data: {
        title,
        content,
        published,
        // @ts-ignore
        authorId: session.user.id,
      },
    });

    redirect("/");

    }


    
    return <div style={{ padding: "20px" }}>
      <h1>Create Blog</h1>

      <form action={createPost}>
        <input name="title" placeholder="Title" required />
        <br /><br />

        <textarea name="content" placeholder="Content" required />
        <br /><br />

        <label>
          <input type="checkbox" name="published" />
          Published
        </label>

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
}
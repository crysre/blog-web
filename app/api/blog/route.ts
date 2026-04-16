import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session){
  return NextResponse.json({error: "Unauthorized"}, {status:401});
}


  const blogsData = await prisma.blog.findMany({
    //@ts-ignore
    where: { authorId: session.user.id },
    orderBy:{createdAt:"desc",}
  });
  return NextResponse.json({
    blogsData,
  });
}




export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

if(!session){
  return NextResponse.json({error: "Unauthorized"}, {status:401});
}

  const data = await req.json();

  const blog = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
      // @ts-ignore
      authorId: session.user.id,
    },
  });
  return NextResponse.json({
    message: "you've been signed up",
    blog
  });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

if(!session){
  return NextResponse.json({error: "Unauthorized"}, {status:401});
}

  const data = await req.json();

  const blog = await prisma.blog.findUnique({
    where: {id: data.id},
  })
//@ts-ignore
  if(!blog || blog?.authorId != session.user.id ){
    return NextResponse.json({error: "Forbidden"}, {status:403});
  }

  const updated = await prisma.blog.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
      published: data.published   },
  });
  return NextResponse.json({
    message: "blog has been updated",
    updated
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)

if(!session){
  return NextResponse.json({error: "Unauthorized"}, {status:401});
}


  const data = await req.json();

  const blog = await prisma.blog.findUnique({
    where: {id: data.id},
  })
//@ts-ignore
  if(!blog || blog?.authorId != session.user.id ){
    return NextResponse.json({error: "Forbidden"}, {status:403});
  }

  await prisma.blog.delete({
    where: { id: data.id },
  });

  return NextResponse.json({message: "Deleted"});
}

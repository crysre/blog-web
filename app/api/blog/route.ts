import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await req.json();

  const blogsData = await prisma.blog.findUnique({
    where: { id: data.id },
  });
  return NextResponse.json({
    message: blogsData,
  });
}

export async function POST(req: NextRequest) {
  const id = 1;
  const data = await req.json();

  await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
      authorId: data.id,
    },
  });
  return NextResponse.json({
    message: "you've been signed up",
  });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  await prisma.blog.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
      authorId: data.id,
    },
  });
  return NextResponse.json({
    message: "blog has been deleted",
  });
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();

  await prisma.blog.delete({
    where: { id: data.id, email: data.email },
  });
}

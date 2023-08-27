import { createPost, getPostBySlug, Post } from "@/db/post";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.error();
  }
  const post = await getPostBySlug(slug);
  return NextResponse.json(post);
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token?.poster) {
      return NextResponse.error();
    }
    const post: Post = await req.json();
    await createPost(post);
    return NextResponse.json({ message: "Post created" });
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
    return NextResponse.error();
  }
}

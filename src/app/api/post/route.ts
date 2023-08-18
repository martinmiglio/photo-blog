import { createPost, getPostBySlug } from "@/api/post";
import { Post } from "@/types/Post/Post";
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
    const post: Post = await req.json();
    console.log(post);
    const response = await createPost(post);
    console.log(response);
    return NextResponse.json({ message: "Post created" });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}

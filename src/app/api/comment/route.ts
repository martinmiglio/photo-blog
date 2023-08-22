import { createComment, Comment } from "@/db/comment";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.error();
  }
  try {
    const comment: Comment = await req.json();
    await createComment(comment);
    return NextResponse.json({ message: "Comment created" });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

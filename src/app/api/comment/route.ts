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
    console.log(comment);
    const response = await createComment(comment);
    console.log(response);
    return NextResponse.json({ message: "Comment created" });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}

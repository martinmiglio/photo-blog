import { getUserById } from "@/db/auth";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.error();
  }
  const user = await getUserById(id);
  return NextResponse.json(user);
}

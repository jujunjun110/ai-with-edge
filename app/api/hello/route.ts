import { NextResponse } from "next/server";

export async function GET() {
  // 1秒待つ
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({ message: "Hello, World!" });
}

import { NextRequest, NextResponse } from "next/server";
//https://github.com/hevi1991/nextjs-upload-to-local-example/blob/main/app/api/file/route.ts
export async function POST (request: NextRequest) {
  const formData = await request.formData();
  const f = formData.get("file");

  const file = f as File;
  console.log(`File name: ${file.name}`);
  console.log(`Content-Length: ${file.size}`);
  console.log(process.cwd());

  return NextResponse.json({ success: true });
}
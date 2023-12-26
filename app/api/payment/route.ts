import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = (await req.json()) as PostInput;

  if (!id) {
    return NextResponse.json(
      { message: "Не найден счет для генерации ссылки на оплату" },
      { status: 400 }
    );
  }
}

interface PostInput {
  id: number;
}

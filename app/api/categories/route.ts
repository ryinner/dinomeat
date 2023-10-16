import { createCategory } from '@/services/orm/categories.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const data = await req.json() as InputsPost;

  const category = await createCategory(data);

  return NextResponse.json({ code: 200, message: 'Создано', category });
}

interface InputsPost {
  name: string;
}

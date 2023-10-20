import { createCategory, getCategoriesPaginated } from '@/services/orm/categories.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const data = await req.json() as InputsPost;

  const category = await createCategory(data);

  return NextResponse.json({ code: 200, message: 'Создано', category });
}

export async function GET (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const categoriesPaginated = await getCategoriesPaginated({
    page: Number(searchParams.get('page') ?? 1)
  });

  return  NextResponse.json({ code: 200, ...categoriesPaginated });
}

interface InputsPost {
  name: string;
}

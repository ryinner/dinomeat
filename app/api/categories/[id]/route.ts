import { updateCategory } from '@/services/orm/categories.service';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, params: Params)  {
  const data = await req.json() as InputsPut;

  const category = await updateCategory(Number(params.id), data);

  return NextResponse.json({ status: 200, message: 'Обновлено', category });
}

interface Params {
  id: number | string;
}

interface InputsPut {
  id: number;
  name?: string;
}
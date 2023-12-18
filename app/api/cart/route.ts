import { getProducts } from '@/services/orm/cart.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ids = searchParams.get('ids')?.split('|').map(id => Number(id));

  if (ids === undefined) {
    return NextResponse.json({ message: 'Неизвестная ошибка' }, { status: 500 })
  }

  const products = await getProducts(ids);

  return NextResponse.json({ products });
}
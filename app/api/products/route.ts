import { search } from '@/services/orm/products.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const products = await search({ query: searchParams.get('query') ?? ''});

  return NextResponse.json({ products }, { status: 200})
}
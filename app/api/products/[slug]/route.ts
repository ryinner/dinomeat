import { show } from '@/services/orm/catalog.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params: { slug } }: RouteParams) {
  const product = await show(slug);

  if (!product) {
    return NextResponse.json({ message: 'Not found' }, { status: 404});
  }

  return NextResponse.json({ product});
}

interface RouteParams {
  params: {
    slug: string;
  }
}

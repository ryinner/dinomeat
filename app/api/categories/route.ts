import { getCategories } from '@/services/orm/categories.service';
import { NextResponse } from 'next/server';

export async function GET () {
  return NextResponse.json({ categories: await getCategories({ where: { published: true }, select: { id: true, name: true }, take: 8 }) }, { status: 200 });
}

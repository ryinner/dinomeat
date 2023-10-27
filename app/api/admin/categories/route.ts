import { authConfig } from '@/configs/auth.config';
import { createCategory, getCategoriesPaginated } from '@/services/orm/categories.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const data = await req.json() as InputsPost;

  const category = await createCategory(data);

  return NextResponse.json({ code: 200, message: 'Создано', category });
}

export async function GET (req: NextRequest) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const { searchParams } = req.nextUrl;

  const categoriesPaginated = await getCategoriesPaginated({
    page: Number(searchParams.get('page') ?? 1)
  });

  return  NextResponse.json({ code: 200, ...categoriesPaginated });
}

interface InputsPost {
  name: string;
}

import { authConfig } from '@/configs/auth.config';
import { generateSlug } from '@/services/lib/slug.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const session = await getServerSession(authConfig);
  
  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const { searchParams }= req.nextUrl;
  const text = searchParams.get('text');

  if (text === null) {
    return NextResponse.json({ message: 'Поле text обязательно для заполнения' }, { status: 400 });
  }

  return NextResponse.json({ code: 200, slug: generateSlug(text) })
}
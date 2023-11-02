import { authConfig } from '@/configs/auth.config';
import { generateSlug } from '@/services/lib/slug.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const { searchParams }= req.nextUrl;
  const text = searchParams.get('text');

  if (text === null) {
    return NextResponse.json({ status: 400, message: 'Поле text обязательно для заполнения' })
  }

  return NextResponse.json({ code: 200, slug: generateSlug(text) })
}
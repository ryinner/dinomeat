import { authConfig } from '@/configs/auth.config';
import { relateSize } from '@/services/orm/products.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: RouteParams }) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const data = await req.json() as POSTInput;

  const relation = await relateSize(Number(params.id), data.sizeId);

  return NextResponse.json({ message: 'Сохранено', relation });
}

interface POSTInput {
  sizeId: number;
}

interface RouteParams {
  id: string;
}

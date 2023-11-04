import { authConfig } from '@/configs/auth.config';
import { getProductForEdit } from '@/services/orm/products.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const { id } = params;

  const product = await getProductForEdit({ id: Number(id) });

  return NextResponse.json({ code: 200, product });
}

export async function POST (req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }
}

interface RouteParams {
  params: {
    id: string;
  }
}
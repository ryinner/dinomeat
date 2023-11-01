import { authConfig } from '@/configs/auth.config';
import { getProductForEdit } from '@/services/orm/products.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const { id } = params;

  const product = await getProductForEdit({ id: Number(id) });

  return NextResponse.json({ code: 200, product });
}

export async function POST (req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }
}

interface RouteParams {
  params: {
    id: string;
  }
}
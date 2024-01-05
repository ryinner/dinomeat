import { authConfig } from '@/configs/auth.config';
import { updateOrder } from '@/services/orm/orders.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { Order } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params: { id } }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const data = await req.json() as Partial<Order>;

  delete data.id;
  delete data.userId;

  const order = await updateOrder({
    data,
    where: {
      id: Number(id)
    }
  });

  return NextResponse.json({ order });
}

interface RouteParams {
  params: {
    id: string;
  }
}
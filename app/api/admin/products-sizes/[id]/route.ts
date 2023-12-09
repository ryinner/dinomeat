import { authConfig } from '@/configs/auth.config';
import { remove, update } from '@/services/orm/productsSizes.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE (req: NextRequest, { params: { id } }: { params: Params }) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  await remove(Number(id));

  return NextResponse.json({ message: 'Сохранено' })
}

export async function PUT (req: NextRequest, { params: { id } }: { params: Params }) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const updateDto = (await req.json()) as InputPut;

  await update(Number(id), {
    data: updateDto
  });

  return NextResponse.json({ message: 'Сохранено' });
}

interface Params {
  id: string;
}

interface InputPut {
  amount: number;
}
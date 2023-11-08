import { authConfig } from '@/configs/auth.config';
import { deleteImage, updateImage } from '@/services/orm/images.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const imageDto = await req.json() as Prisma.ImageUpdateArgs;

  const image = await updateImage(Number(params.id), imageDto);

  return NextResponse.json({ message: 'Обновлено', image }, { status: 200 });
}

export async function DELETE (req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  await deleteImage(Number(params.id));

  return NextResponse.json({ message: 'Удалено' }, { status: 200 });
}

interface RouteParams {
  params: {
    id: string;
  }
}
import { authConfig } from '@/configs/auth.config';
import { getProductForEdit, updateProduct } from '@/services/orm/products.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { Prisma } from '@prisma/client';
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

  const productDto = await req.json() as Prisma.ProductUpdateInput;

  const { id } = params;

  const product = await updateProduct(Number(id), productDto);

  return NextResponse.json({ message: 'Обновлено', product }, { status: 200 });
}

interface RouteParams {
  params: {
    id: string;
  }
}
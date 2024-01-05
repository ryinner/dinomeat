import { EmployerWithImage } from '@/@types/private';
import { authConfig } from '@/configs/auth.config';
import { removeEmployer, updateEmployer } from '@/services/orm/employers.service';
import { replaceFile } from '@/services/orm/images.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params: { id } }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV === 'production') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const formData = await req.formData();
  const image = formData.get('image');
  const name = formData.get('name');
  const post = formData.get('post');
  const position = formData.get('position');

  const updateData: Prisma.EmployerUpdateInput = {};

  if (name) {
    updateData.name = name.toString();
  }
  if (post) {
    updateData.post = post.toString();
  }
  if (position) {
    updateData.position = Number(position.toString());
  }

  const employer = await updateEmployer({
    data: updateData,
    where: {
      id: Number(id)
    },
    include: {
      image: true
    },
  }) as EmployerWithImage;

  if (image instanceof File) {
    await replaceFile(image, employer.image.url);
  }

  return NextResponse.json({ employer });
}

export async function DELETE (req: NextRequest, { params: { id } }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV === 'production') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  await removeEmployer(Number(id));
  return NextResponse.json({ message: 'Успешно' });
}

interface RouteParams {
  params: {
    id: string;
  }
}
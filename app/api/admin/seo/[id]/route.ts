import { authConfig } from '@/configs/auth.config';
import { updateSeo } from '@/services/orm/seo.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const seoDto = await req.json() as Prisma.SeoUpdateInput;

  const seo = await updateSeo(Number(params.id), seoDto);

  return NextResponse.json({ message: 'Обновлено', seo }, { status: 200 })
}

interface RouteParams {
  params: {
    id: string;
  }
}

import { authConfig } from '@/configs/auth.config';
import { deleteBanner } from '@/services/orm/banners.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

  deleteBanner(Number(id));

  return NextResponse.json({ message: 'Удалено' });
}

interface RouteParams {
  params: {
    id: string;
  }
}
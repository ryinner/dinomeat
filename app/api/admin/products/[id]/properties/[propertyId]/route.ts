import { authConfig } from '@/configs/auth.config';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PUT (req: Request, { params }: RouteParams) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV !== 'development') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const { value } = (await req.json() as { value?: string});

  if (value === undefined) {
    
  } else {
    
  }
}

interface RouteParams {
  params: {
    id: string;
    propertyId: string;
  }
}
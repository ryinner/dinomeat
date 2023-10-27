import { authConfig } from '@/configs/auth.config';
import { updateProperty } from '@/services/orm/properties.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const data = await req.json() as InputsPut;

  const property = await updateProperty(Number(params.id), data);

  return NextResponse.json({ status: 200, message: 'Обновлено', property });
}

interface Params {
  id: number | string;
}

interface InputsPut {
  id: number;
  name?: string;
}
import { authConfig } from '@/configs/auth.config';
import { userIsAdmin } from '@/services/orm/users.service';
import { deleteValue, updateValue } from '@/services/orm/values.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const data = await req.json() as InputPut;

  const value = await updateValue(Number(params.id), data);

  return NextResponse.json({ code: 200, value });
}

export async function DELETE (req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  await deleteValue(Number(params.id));

  return NextResponse.json({ code: 200 });
}

interface InputPut {
  value: string;
}

interface Params {
  id: string;
}

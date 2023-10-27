import { authConfig } from '@/configs/auth.config';
import { updateUser, userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest,  { params }: { params: Params }) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const data = await req.json() as InputPut;

  const user = await updateUser(params.id, data);

  return NextResponse.json({ code: 200, user });
}

interface Params {
  id: string;
}

interface InputPut {
  isAdmin: boolean;
}
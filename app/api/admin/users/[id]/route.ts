import { updateUser } from '@/services/orm/users.service';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest,  { params }: { params: Params }) {
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
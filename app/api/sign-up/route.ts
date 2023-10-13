import { signUp } from '@/services/orm/users.service';
import { NextRequest, NextResponse } from 'next/server';

interface Inputs {
  email?: string;
  name?: string;
  password?: string;
}

export async function POST (req: NextRequest) {
  const data = await req.json() as Inputs;

  if (typeof data.email !== 'string' && typeof data.password !== 'string') {
    return NextResponse.json({ code: 400, message: 'Заполнены не все поля' });
  }

  await signUp(data);

  return NextResponse.json({ code: 200, message: 'Регистрация прошла успешно' });
}

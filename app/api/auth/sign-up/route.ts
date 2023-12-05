import { PrismaErrorsTypes, getPrismaErrorType, isPrismaError } from '@/services/lib/prisma.service';
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

  try {
    await signUp(data);
  } catch (error) {
    if (isPrismaError(error)) {
      const errorType = getPrismaErrorType(error);
      switch (errorType) {
        case PrismaErrorsTypes.unique:

          return NextResponse.json(
            { message: "Пользователь с такой почтой или телефоном уже зарегистрирован" },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { message: "Неизвестная ошибка БД" },
            { status: 400 }
          );
      }
    }
    return NextResponse.json({ code: 400, message: 'Неизвестная ошибка' }, { status: 400 });
  }

  return NextResponse.json({ code: 200, message: 'Регистрация прошла успешно' });
}

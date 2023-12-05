import { authConfig } from "@/configs/auth.config";
import {
  PrismaErrorsTypes,
  getPrismaErrorType,
  isPrismaError,
} from "@/services/lib/prisma.service";
import { updateUser } from "@/services/orm/users.service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT (req: NextRequest) {
  const session = await getServerSession(authConfig);
  const input = (await req.json()) as InputPut;

  if (!session) {
    return NextResponse.json(
      { code: 403, message: "Не авторизован" },
      { status: 403 }
    );
  }
  try {
    await updateUser(session.user.id, input);
  } catch (error) {
    if (isPrismaError(error)) {
      const errorType = getPrismaErrorType(error);
      switch (errorType) {
        case PrismaErrorsTypes.unique:
          return NextResponse.json(
            {
              code: 400,
              message:
                "Пользователь с такой почтой или телефоном уже зарегистрирован",
            },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { code: 400, message: "Неизвестная ошибка БД" },
            { status: 400 }
          );
      }
    }
    return NextResponse.json(
      { code: 400, message: "Неизвестная ошибка" },
      { status: 400 }
    );
  }

  return NextResponse.json({ code: 200, message: "Обновлено" });
}

interface InputPut {
  phone?: string;
  email?: string;
  name?: string;
}

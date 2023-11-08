import {
  PrismaErrorsTypes,
  getPrismaErrorType,
  isPrismaError,
} from "@/services/lib/prisma.service";
import { getProductImagesPath, writeFile } from "@/services/orm/images.service";
import { updateProduct } from "@/services/orm/products.service";
import { NextRequest, NextResponse } from "next/server";

interface RouteRequiredParams {
  id: string | number; // productId
}

export async function POST(
  req: NextRequest,
  { params }: { params: RouteRequiredParams }
): Promise<NextResponse> {
  const formData = await req.formData();
  const file = formData.get("image");
  const alt = formData.get("alt")?.toString();

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "картинка обязательна" },
      { status: 400 }
    );
  }

  if (!alt || alt?.trim() === "") {
    return NextResponse.json({ message: "alt is required" }, { status: 400 });
  }

  const fileInfo = await writeFile(file, getProductImagesPath(params.id));

  try {
    const productWithImage = await updateProduct(Number(params.id), {
      data: {
        images: {
          create: {
            image: {
              create: {
                alt,
                url: fileInfo.filepath,
              },
            },
          },
        },
      },
      select: {
        images: {
          include: {
            image: true
          }
        }
      }
    });
    return NextResponse.json({ status: 200, product: productWithImage });

  } catch (error) {
    if (isPrismaError(error)) {
      const errorType = getPrismaErrorType(error);
      switch (errorType) {
        case PrismaErrorsTypes.unique:
          return NextResponse.json(
            { message: "Картинка с таким именем уже загружена" },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { message: "Неизвестная ошибка БД" },
            { status: 400 }
          );
      }
    }
  }
  return NextResponse.json({ status: 400, message: 'Неизвестная ошибка' }, { status: 400});
}

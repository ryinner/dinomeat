import { getProductImagesPath, writeFile } from '@/services/orm/images.service';
import { updateProduct } from '@/services/orm/products.service';
import { NextRequest, NextResponse } from 'next/server';

interface RouteRequiredParams {
  id: string | number; // productId
}

export async function POST (req: NextRequest, { params }: { params: RouteRequiredParams}): Promise<NextResponse> {
  const formData = await req.formData();
  const file = formData.get('image');
  const alt = formData.get('alt')?.toString();

  if (!(file instanceof File)) {
    return NextResponse.json({ status: 400, message: 'file is required' });
  }

  if (!alt || alt?.trim() === '') {
    return NextResponse.json({ status: 400, message: 'alt is required' });
  }

  const fileInfo = await writeFile(file, getProductImagesPath(params.id));

  await updateProduct(Number(params.id), {
    images: {
      create: {
        image: {
          create: {
            alt,
            url: fileInfo.filepath
          }
        }
      }
    }
  });

  return NextResponse.json({ status: 200, fileInfo });
}
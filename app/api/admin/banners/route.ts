import { createBanner, getLastBanner } from '@/services/orm/banners.service';
import { getBannersImagesPath, writeFile } from '@/services/orm/images.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "картинка обязательна" },
      { status: 400 }
    );
  }

  const fileInfo = await writeFile(file, getBannersImagesPath((await getLastBanner())?.id ?? 1));

  const banner = createBanner({
    data: {
      image: {
        create: {
          alt: '',
          url: fileInfo.filepath,
        }
      },
    },
    select: {
      image: true
    }
  });

  return NextResponse.json({ banner });
}
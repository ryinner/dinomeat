import { authConfig } from '@/configs/auth.config';
import { createBanner, getLastBanner } from '@/services/orm/banners.service';
import { getBannersImagesPath, writeFile } from '@/services/orm/images.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (process.env.NODE_ENV === 'production') {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const formData = await req.formData();

  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "картинка обязательна" },
      { status: 400 }
    );
  }

  const lastBanner = await getLastBanner();
  const lastId = lastBanner === null ? 1 : lastBanner.id + 1;

  const fileInfo = await writeFile(file, getBannersImagesPath(lastId));

  const banner = await createBanner({
    data: {
      image: {
        create: {
          alt: '',
          url: fileInfo.filepath,
        }
      },
    },
    include: {
      image: true
    }
  });

  return NextResponse.json({ banner });
}
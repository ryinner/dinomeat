import { authConfig } from '@/configs/auth.config';
import { generateSlug } from '@/services/lib/slug.service';
import { createEmployer, getLastEmployerPosition } from '@/services/orm/employers.service';
import { getEmployersImagesPath, writeFile } from '@/services/orm/images.service';
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

  const name = formData.get("name");
  const post = formData.get("post");

  if (!name) {
    return NextResponse.json(
      { message: "Имя обязательно" },
      { status: 400 }
    );
  }

  if (!post) {
    return NextResponse.json(
      { message: "Должность обязательна" },
      { status: 400 }
    );
  }

  const fileInfo = await writeFile(file, getEmployersImagesPath(generateSlug(name.toString())));

  const employer = await createEmployer({
    data: {
      name: name.toString(),
      post: post.toString(),
      position: await getLastEmployerPosition(),
      image: {
        create: {
          url: fileInfo.filepath,
          alt: name.toString(),
        }
      }
    },
    include: {
      image: true
    }
  });

  return NextResponse.json({ employer });
}

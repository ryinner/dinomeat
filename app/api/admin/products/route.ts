import { authConfig } from '@/configs/auth.config';
import { createProduct } from '@/services/orm/products.service';
import { userIsAdmin } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  if (!(await userIsAdmin({ where: { id: session.user.id } }))) {
    return NextResponse.json({ code: 403, message: 'Forbidden' });
  }

  const data = await req.json() as POSTInput;

  const product = await createProduct(data, { withMargin: false});

  return NextResponse.json({ code: 200, product });
}

interface POSTInput {
  name: string;
}
import { CartItem } from '@/components/TheProviders/TheCartContext';
import { checkIsAvailableForOrder, createOrder, getProducts } from '@/services/orm/cart.service';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ids = searchParams.get('ids')?.split('|').map(id => Number(id));

  if (ids === undefined) {
    return NextResponse.json({ message: 'Неизвестная ошибка' }, { status: 500 })
  }

  const products = await getProducts(ids);

  return NextResponse.json({ products });
}

export async function POST (req: NextRequest) {
  const { cart, order: orderInput } = (await req.json() as PostInput);

  const { isAvailable, errors } = await checkIsAvailableForOrder(cart);

  if (!isAvailable) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const order = createOrder({
    order: orderInput,
    cart
  });

  return NextResponse.json({ order });
}

interface PostInput {
  cart: CartItem[];
  order: Prisma.OrderCreateInput;
}
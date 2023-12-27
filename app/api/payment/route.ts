import { register } from '@/services/api/alpha.service';
import { getForPaymentLink } from '@/services/orm/orders.service';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = (await req.json()) as PostInput;

  if (!id) {
    return NextResponse.json(
      { message: "Не найден счет для генерации ссылки на оплату" },
      { status: 400 }
    );
  }

  const order = await getForPaymentLink(id);

  const amount = order.productsSizes.reduce((accum, s) => accum += s.sum, 0);

  if (amount === 0) {
    return NextResponse.json(
      { message: "Сумма заказа равна нулю" },
      { status: 400 }
    );
  }

  const answer = await register({
    orderNumber: String(order.id),
    amount,
    returnUrl: `${process.env.NEXT_PUBLIC_URL}/orders/${order.id}`,
    email: order.email,
    postAddress: `г. ${order.city}, ${order.address}, ${order.postalCode}`
  });

  return NextResponse.json(answer);
}

interface PostInput {
  id: number;
}

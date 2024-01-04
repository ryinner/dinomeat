import TheCart from '@/components/Cart/TheCart';
import { authConfig } from '@/configs/auth.config';
import { findUserForSite } from '@/services/orm/users.service';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: "Корзина | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Сделай заказ прямо сейчас!",
};

export default async function Cart () {
  const session = await getServerSession(authConfig);
  const user = session ? await findUserForSite(session.user.id) : undefined;

  return <TheCart user={user} />
}
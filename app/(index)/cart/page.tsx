import TheCart from '@/components/Cart/TheCart';
import { authConfig } from '@/configs/auth.config';
import { findUserForSite } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';

export default async function Cart () {
  const session = await getServerSession(authConfig);
  const user = session ? await findUserForSite(session.user.id) : undefined;

  return <TheCart user={user} />
}
import UsersTable from '@/components/Private/Users/UsersTable';
import { getUsersPaginated } from '@/services/orm/users.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Пользователи',
  description: 'Страница редактирования пользователей'
}

export default async function Admin ({ searchParams }: Params) {
  const { page = 1 } = searchParams;
  const { users } = (await getUsersPaginated({ page }));

  return <UsersTable users={users} />
}


interface Params {
  searchParams: {
    page?: number;
  }
}
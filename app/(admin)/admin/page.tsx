import { getUsersPaginated } from '@/services/orm/users.service';

export default async function Admin ({ searchParams }: Params) {
  const { page = 1 } = searchParams;
  const { users } = (await getUsersPaginated({ page }));

  return <></>
}


interface Params {
  searchParams: {
    page?: number;
  }
}
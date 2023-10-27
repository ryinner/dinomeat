import Pagination from '@/components/Pagination/Pagination';
import UsersTable from "@/components/Private/Users/UsersTable";
import { getUsersPaginated } from "@/services/orm/users.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользователи",
  description: "Страница редактирования пользователей",
};

export default async function Admin({ searchParams }: Params) {
  const { page = 1 } = searchParams;
  const { users, pagination } = await getUsersPaginated({ page });

  return (
    <>
      <UsersTable users={users} />
      <Pagination {...pagination} />
    </>
  );
}

interface Params {
  searchParams: {
    page?: number;
  };
}

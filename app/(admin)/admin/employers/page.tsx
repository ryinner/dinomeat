import Pagination from "@/components/Pagination/Pagination";
import EmployersTable from "@/components/Private/Employers/EmployersTable";
import { getEmployersPaginated } from "@/services/orm/employers.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сотрудники",
  description: "Страница перечисления всех сотрудников",
};

export default async function EmployersList({
  searchParams: { page },
}: Params) {
  const { employers, pagination } = await getEmployersPaginated({
    page: Number(page ?? 1),
  });

  return (
    <>
      <EmployersTable employers={employers} />
      <Pagination {...pagination} />
    </>
  );
}

interface Params {
  searchParams: {
    page?: number;
  };
}

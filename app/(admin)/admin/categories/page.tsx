import Pagination from '@/components/Pagination/Pagination';
import CategoriesTable from '@/components/Private/Categories/CategoriesTable';
import { getCategoriesPaginated } from '@/services/orm/categories.service';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категории",
  description: "Страница редактирования категорий",
};

export default async function TheCategoriesListView({ searchParams }: Params) {
  const { categories: initialCategories, pagination } = (await getCategoriesPaginated({
    page: Number(searchParams.page ?? 1)
  }));

  console.log(pagination);

  return (<>
    <CategoriesTable categories={initialCategories}/>
    <Pagination {...pagination} />
  </>);
}

interface Params {
  searchParams: {
    page?: number;
  }
}
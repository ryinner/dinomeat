import CategoriesTable from '@/components/Private/Categories/CategoriesTable';
import { getCategoriesPaginated } from '@/services/orm/categories.service';
import { Category } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категории",
  description: "Страница редактирования категорий",
};

export default async function TheCategoriesListView({ searchParams }: Params) {
  const { categories: initialCategories } = (await getCategoriesPaginated({
    page: Number(searchParams.page ?? 1)
  }));

  return (
    <CategoriesTable categories={initialCategories}/>
  );
}

interface CategoriesList {
  categories: Category[];
}

interface Params {
  searchParams: {
    page?: number;
  }
}
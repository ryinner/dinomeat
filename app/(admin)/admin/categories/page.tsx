import CategoriesTable from '@/components/Private/Categories/CategoriesTable';
import { request } from "@/services/api/api.service";
import { Category } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категории",
  description: "Страница редактирования категорий",
};

export default async function TheCategoriesListView({ searchParams }: Params) {
  const { categories: initialCategories } = (await request<CategoriesList>(
    `/api/admin/categories?page=${searchParams.page ?? 1}`,
    {
      cache: "no-cache",
    }
  ));

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
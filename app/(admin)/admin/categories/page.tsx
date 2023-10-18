import CategoriesTable from '@/components/Categories/CategoriesTable';
import { request } from "@/services/api/api.service";
import { Category } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категории",
  description: "Страница редактирования категорий",
};

export default async function TheCategoriesListView() {
  const { categories: initialCategories } = (await request<CategoriesList>(
    "/api/categories",
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

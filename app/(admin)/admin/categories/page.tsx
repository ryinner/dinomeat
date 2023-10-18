import CategoriesTable from '@/components/Categories/CategoriesTable';
import { getData } from "@/services/api/api.service";
import { Category } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категории",
  description: "Страница редактирования категорий",
};

export default async function TheCategoriesListView() {
  const { categories: initialCategories } = (await getData(
    "/api/categories",
    {
      cache: "no-cache",
    }
  )) as CategoriesList;

  return (
    <CategoriesTable categories={initialCategories}/>
  );
}

interface CategoriesList {
  categories: Category[];
}

import Pagination from '@/components/Pagination/Pagination';
import ProductsTable from "@/components/Private/Products/ProductsTable";
import { getProductsPaginated } from "@/services/orm/products.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукты",
  description: "Страница перечисления всех продуктов",
};

export default async function TheProductsListView({ searchParams }: Params) {
  const { page = 1 } = searchParams;

  const { products, pagination } = await getProductsPaginated({
    page: Number(page),
  });

  return (
    <>
      <ProductsTable products={products} />
      <Pagination {...pagination} />
    </>
  );
}

interface Params {
  searchParams: {
    page?: number;
  };
}

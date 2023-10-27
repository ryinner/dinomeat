import ProductsTable from '@/components/Private/Products/ProductsTable';
import { getProductsPaginated } from '@/services/orm/products.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Продукты',
  description: 'Страница перечисления всех продуктов'
}

export default async function TheProductsListView ({ searchParams }: Params) {
  const { page = 1 } = searchParams;

  const { products } = (await getProductsPaginated({ page: Number(page) }));

  return <ProductsTable products={products} />
}

interface Params {
  searchParams: {
    page?: number;
  }
}
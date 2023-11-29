import TheProducts from '@/components/Catalog/TheProducts';
import Pagination from '@/components/Pagination/Pagination';
import { catalog } from '@/services/orm/catalog.service';
import { Metadata } from 'next';
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Каталог | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Лучшие товары во всей России.",
};

export default async function Catalog({ searchParams }: Props) {
  const { products, pagination } = (await catalog({
    page: Number(searchParams.page ?? 1),
    categoryId: searchParams.category_id ? Number(searchParams.category_id) : undefined
  }));

  return (
    <section className={styles.catalog}>
      <TheProducts products={products} />
      <Pagination className={styles.catalog__pagination} {...pagination} />
    </section>
  );
}

interface Props {
  searchParams: {
    page?: string;
    price?: {
      min?: string;
      max?: string;
    },
    params?: {
      id: string;
      value_ids: string[];
    }[];
    category_id: string;
  }
}
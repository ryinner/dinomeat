import TheFilters from '@/components/Catalog/TheFilters';
import TheProducts from '@/components/Catalog/TheProducts';
import Pagination from '@/components/Pagination/Pagination';
import { buildFiltersMap } from '@/services/lib/filters.service';
import { catalog, filters } from '@/services/orm/catalog.service';
import { Metadata } from 'next';
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Каталог | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Лучшие товары во всей России.",
};

export default async function Catalog({ searchParams }: Props) {
  const params = buildFiltersMap(searchParams);

  const filtersProps = (await filters());

  const { products, pagination } = (await catalog({
    page: Number(searchParams.page ?? 1),
    categoryId: searchParams.category_id ? Number(searchParams.category_id) : undefined,
    params: params.length > 0 ? params : undefined,
    price: {
      min: Number(searchParams.price_min ?? filtersProps.price.min),
      max: Number(searchParams.price_max ?? filtersProps.price.max),
    }
  }));


  return (
    <section className={styles.catalog}>
      <TheFilters {...filtersProps} />
      <TheProducts products={products} />
      <Pagination className={styles.catalog__pagination} {...pagination} />
    </section>
  );
}

interface Props {
  searchParams: Record<string, string>
}
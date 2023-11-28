import TheProducts from '@/components/Catalog/TheProducts';
import { catalog } from '@/services/orm/catalog.service';
import { Metadata } from 'next';
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Каталог | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Лучшие товары во всей России.",
};

export default async function Catalog() {

  const { products } = (await catalog({}));

  return (
    <section className={styles.catalog}>
      <TheProducts products={[]} />
    </section>
  );
}

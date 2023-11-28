import { Metadata } from 'next';
import Image from "next/image";
import TestProduct1 from "../../../public/test-products/test-product-1.jpg";
import TestProduct2 from "../../../public/test-products/test-product-2.jpg";
import TestProduct3 from "../../../public/test-products/test-product-3.jpg";
import styles from "./page.module.scss";

const products = [
  {
    id: 1,
    name: "Adidas Originals Forum Low",
    price: 11799,
    image: TestProduct1,
  },
  {
    id: 2,
    name: "Nike Good Vibes",
    price: 8699,
    image: TestProduct2,
  },
  {
    id: 3,
    name: "Adidas M 3s Ft Te Pt",
    price: 8899,
    image: TestProduct3,
  },
];

export const metadata: Metadata = {
  title: "Каталог | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Лучшие товары во всей России.",
};

export default function Catalog() {
  return (
    <section className={styles.catalog}>
      {products.map((p) => (
        <article key={p.id} className={styles.catalog__item}>
          <Image src={p.image} alt={p.name} style={{ position: 'relative', width: '100%', height: '100%' }} className={styles.catalog__image} />
          <div className={styles.catalog__info}>
            <div className={styles.catalog__name}>{p.name}</div>
            <div className={styles.catalog__price}>Цена: {p.price} ₽</div>
          </div>
        </article>
      ))}
    </section>
  );
}

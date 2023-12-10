import type { ProductCatalog } from "@/@types/private";
import { getUrl } from "@/services/lib/image.service";
import Image from "next/image";
import Link from "next/link";
import styles from "./TheProducts.module.scss";

export default function TheProducts({ products }: Props) {
  return (
    <section className={styles.products}>
      {products.map((p) => (
        <article
          key={p.id}
          className={`${styles.products__container} ${styles.products__item}`}
        >
          <picture className={styles.products__picture}>
          <Link href={`/catalog/${p.slug}`}>
            <Image
              src={getUrl(p.images[0].image.url)}
              alt={p.images[0].image.alt ?? ""}
              fill={true}
              className={styles.products__image}
            />
            </Link>
          </picture>
          <div className={styles.products__info}>
            <div className={styles.products__name}>
              <Link href={`/catalog/${p.slug}`}>{p.name}</Link>
            </div>
            <div className={styles.products__article}><Link href={`/catalog/${p.slug}`}>{p.article}</Link></div>
            <div className={styles.products__price}>
              <span>Цена</span> <span>{p.price} ₽</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

interface Props {
  products: ProductCatalog[];
}

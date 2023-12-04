import { getUrl } from "@/services/lib/image.service";
import { main } from "@/services/orm/catalog.service";
import Image from "next/image";
import Link from "next/link";
import ArrowLong from "../../public/icons/arrow-long-right.svg";
import ArrowShort from "../../public/icons/arrow-short-right.svg";
import DefaultLink from "../Links/DefaultLink";
import styles from "./TheProducts.module.scss";

export default async function TheProducts() {
  const products = await main();

  return (
    <section className={styles.products}>
      {products.map((p) => (
        <article key={p.id} className={`${styles.products__item} not-mobile`}>
          <Link href={`/catalog/${p.slug}`}>
            <Image
              src={getUrl(p.images[0].image.url)}
              alt={p.images[0].image.alt ?? ""}
              fill={true}
              className={styles.products__image}
            />
          </Link>
        </article>
      ))}
      <DefaultLink href="/catalog" className={styles.products__button}>
        <div className={styles.products__link}>
          Смотреть новинки
          <Image src={ArrowLong} alt="" className={`${styles.products__icon} not-mobile`} />
          <Image src={ArrowShort} alt="" className={`${styles.products__icon} only-mobile`} />
        </div>
      </DefaultLink>
    </section>
  );
}

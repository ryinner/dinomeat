import type { ProductCatalog } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';
import Link from 'next/link';
import styles from './TheProducts.module.scss';

export default function TheProducts ({ products }: Props) {
  return <section className={styles.products}>
    {products.map((p) => (
      <Link className={styles.products__item} key={p.id} href={`/catalog/${p.slug}`}>
        <article className={styles.products__container}>
          <picture className={styles.products__picture}>
            <Image src={getUrl(p.images[0].image.url)} alt={p.images[0].image.alt ?? ''} fill={true} className={styles.products__image} />
          </picture>
          <div className={styles.products__info}>
            <div className={styles.products__name}>{p.name}</div>
            <div className={styles.products__article}>{p.article}</div>
            <div className={styles.products__price}><span>Цена</span> <span>{p.price} ₽</span></div>
          </div>
        </article>
      </Link>
      ))}
  </section>
}

interface Props {
  products: ProductCatalog[]
}
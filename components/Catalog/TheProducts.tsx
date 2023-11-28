import type { ProductCatalog } from '@/@types/private';
import Image from 'next/image';
import styles from './TheProducts.module.scss';

export default function TheProducts ({ products }: Props) {
  return <section className={styles.products}>
    {products.map((p) => (
        <article key={p.id} className={styles.products__item}>
          <picture className={styles.products__picture}>
            <Image src={process.env.NEXT_PUBLIC_URL + p.images[0].image.url} alt={process.env.NEXT_PUBLIC_URL + p.images[0].image.alt} fill={true} className={styles.products__image} />
          </picture>
          <div className={styles.products__info}>
            <div className={styles.products__name}>{p.name} {p.article}</div>
            <div className={styles.products__price}>Цена: {p.price} ₽</div>
          </div>
        </article>
      ))}
  </section>
}

interface Props {
  products: ProductCatalog[]
}
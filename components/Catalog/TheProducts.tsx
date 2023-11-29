import type { ProductCatalog } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';
import styles from './TheProducts.module.scss';

export default function TheProducts ({ products }: Props) {
  return <section className={styles.products}>
    {products.map((p) => (
        <article key={p.id} className={styles.products__item}>
          <picture className={styles.products__picture}>
            <Image src={getUrl(p.images[0].image.url)} alt={p.images[0].image.alt ?? ''} fill={true} className={styles.products__image} />
          </picture>
          <div className={styles.products__info}>
            <div className={styles.products__name}>{p.name}</div>
            <div className={styles.products__article}>{p.article}</div>
            <div className={styles.products__price}><span>Цена</span> <span className={styles['products__price-value']}><span>{p.price}</span> <span>руб.</span></span></div>
          </div>
        </article>
      ))}
  </section>
}

interface Props {
  products: ProductCatalog[]
}
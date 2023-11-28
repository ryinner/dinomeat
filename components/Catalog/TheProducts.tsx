import type { ProductCatalog } from '@/@types/private';
import Image from 'next/image';
import styles from './TheProducts.module.scss';

export default function TheProducts ({ products }: Props) {
  return <section>
    {products.map((p) => (
        <article key={p.id} className={styles.catalog__item}>
          <Image src={p.images[0].image.url} alt={p.name} style={{ position: 'relative', width: '100%', height: '100%' }} className={styles.catalog__image} />
          <div className={styles.catalog__info}>
            <div className={styles.catalog__name}>{p.name}</div>
            <div className={styles.catalog__price}>Цена: {p.price} ₽</div>
          </div>
        </article>
      ))}
  </section>
}

interface Props {
  products: ProductCatalog[]
}
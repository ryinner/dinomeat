import { OrdersProductsSizesEdit } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';
import styles from './OrderProducts.module.scss';

export default function OrderProducts ({ sizes }: Props) {
  return <section>
    {sizes.map(s => <article className={styles.product} key={s.id}>
      <picture className={styles.product__image}>
        <Image
          src={getUrl(s.productSize.product.images[0].image.url)}
          alt={s.productSize.product.images[0].image.alt ?? ''}
          fill={true}
          quality={100}
        />
      </picture>
      <div className={styles.product__info}>
        <div className={styles.product__paragraph}>{s.productSize.product.name}</div>
        <div className={styles.product__paragraph}>Размер: {s.productSize.size.name}</div>
        <div className={styles.product__paragraph}>Кол-во: {s.amount}</div>
      </div>
    </article>)}
  </section>
}

interface Props {
  sizes: OrdersProductsSizesEdit[];
}
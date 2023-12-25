import { ProductCart } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';
import { useCart } from '../TheProviders/TheCartContext';
import styles from './CartProduct.module.scss';

export default function CartProduct ({ product }: Props) {
  const {
    updateCart,
    findInCart
  } = useCart();
  console.log(product);

  const cartItem = findInCart(product.id);
  const [image] = product.product.images;

  return <article className={styles.product}>
    <picture className={styles['product__image-container']}>
      <Image
        src={getUrl(image.image.url)}
        quality={100}
        alt={image.image.alt ?? ''}
        fill={true}
        className={styles.product__image}
      />
    </picture>
    <div className={styles.product__info}>
      <div className={styles.product__paragraph}>{product.product.name}</div>
      <div className={styles.product__paragraph}>Размер: {product.size.name}</div>
      <div className={styles.product__paragraph}>
        Кол-во: {cartItem?.amount}
      </div>
    </div>
  </article>
}

interface Props {
  product: ProductCart;
}
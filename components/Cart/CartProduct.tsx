import { ProductCart } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useCart } from '../TheProviders/TheCartContext';
import styles from './CartProduct.module.scss';

export default function CartProduct ({ product, onRemove }: Props) {
  const {
    updateCart,
    findInCart
  } = useCart();

  const cartItem = findInCart(product.id);
  const [image] = product.product.images;

  if (!cartItem) {
    onRemove(product);
  }

  function lessHandler () {
    updateCart(product.id, -1);
  }

  function moreHandler () {
    if ((cartItem?.amount ?? 1000000) >= product.amount) {
      toast('К сожалению товара на складе меньше чем вы хотите заказать');
      return;
    }
    updateCart(product.id, 1);
  }

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
        <button className={styles.product__controls} title='Уменьшить количество' onClick={lessHandler}>-</button> {cartItem?.amount} <button title='Увеличить количество' className={styles.product__controls} onClick={moreHandler}>+</button>
      </div>
    </div>
  </article>
}

interface Props {
  product: ProductCart;
  onRemove: (p: ProductCart) => void;
}
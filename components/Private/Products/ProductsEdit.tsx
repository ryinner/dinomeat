'use client'

import { ProductEdit } from '@/@types/private';
import Button from '@/components/Button/Button';
import { usePropsState } from '@/hooks/StateHooks';
import styles from './ProductsEdit.module.scss';

export function ProductsEdit ({ product: initialProduct }: Props) {
  const { seo: initialSeo, images: initialImages, ...productData } = initialProduct;

  const [product, setProduct] = usePropsState(productData);
  const [images, setImages] = usePropsState(initialImages);
  const [seo, setSeo] = usePropsState(initialSeo);

  return <div className={styles.product}>
    <div className={styles.product__main}>
      <form>
        <fieldset>
          <legend>Базовая информация</legend>
          <label>
            Название:
            <input type='text' value={product.name} />
          </label>
          <label>
            Артикул:
            <input type='text' value={String(product.article)} />
          </label>
          <label>
            Slug (Адрес):
            <input type='text' disabled={true} value={String(product.slug)} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Размеры</legend>
          <label>
            Вес (кг):
            <input type='text' value={product.weight} />
          </label>
          <label>
            Длина (см):
            <input type='text' value={product.length} />
          </label>
          <label>
            Ширина (см):
            <input type='text' value={product.width} />
          </label>
          <label>
            Высота:
            <input type='text' value={product.height} />
          </label>
        </fieldset>
        <Button type='submit'>Сохранить</Button>
      </form>
    </div>
    <div className={styles.product__additional}>

    </div>
  </div>;
}

interface Props {
  product: ProductEdit;
}
'use client'

import { ProductEdit } from '@/@types/private';
import Button from '@/components/Button/Button';
import ControlsEditor from '@/components/Controls/ControlsEditor';
import { useImmer } from 'use-immer';
import styles from './ProductsEdit.module.scss';

export function ProductsEdit ({ product: initialProduct }: Props) {
  const { seo: initialSeo, images: initialImages, ...productData } = initialProduct;

  const [product, updateProduct] = useImmer(productData);
  const [images, updateImages] = useImmer(initialImages);
  const [seo, updateSeo] = useImmer(initialSeo);

  return <div className={styles.product}>
    <div className={styles.product__main}>
      <form>
        <fieldset>
          <legend>Базовая информация</legend>
          <label>
            Название:
            <input type='text' defaultValue={product.name} />
          </label>
          <label>
            Артикул:
            <input type='text' defaultValue={product.article ?? ''} />
          </label>
          <label>
            Slug (Адрес):
            <input type='text' disabled={true} defaultValue={product.slug ?? ''} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Размеры</legend>
          <label>
            Вес (кг):
            <input type='text' defaultValue={product.weight} />
          </label>
          <label>
            Длина (см):
            <input type='text' defaultValue={product.length} />
          </label>
          <label>
            Ширина (см):
            <input type='text' defaultValue={product.width} />
          </label>
          <label>
            Высота (см):
            <input type='text' defaultValue={product.height} />
          </label>
        </fieldset>
        <Button type='submit'>Сохранить</Button>
      </form>
      <form>
        <ControlsEditor text={product.description ?? ''} onUpdate={(text) => { updateProduct((product) => { product.description = text; });} } />
      </form>
      {product.description}
    </div>
    <div className={styles.product__additional}>

    </div>
  </div>;
}

interface Props {
  product: ProductEdit;
}
'use client'

import { ProductEdit } from '@/@types/private';
import Button from '@/components/Button/Button';
import ControlsEditor from '@/components/Controls/ControlsEditor';
import BoltIcon from '@/components/Icons/BoltIcon';
import { frontRequest } from '@/services/api/api.service';
import { updateObjectField } from '@/services/dom/input';
import { FormEvent } from 'react';
import { useImmer } from 'use-immer';
import styles from './ProductsEdit.module.scss';

export function ProductsEdit ({ product: initialProduct }: Props) {
  const { seo: initialSeoList, images: initialImages, properties: initialProperties, ...productData } = initialProduct;

  const [initialSeo] = initialSeoList;

  const [product, updateProduct] = useImmer(productData);
  const [images, updateImages] = useImmer(initialImages);
  const [seo, updateSeo] = useImmer(initialSeo ?? {});

  async function getSlug () {
    const { slug } = (await  frontRequest<{ slug: string }>(`/api/admin/slug?text=${product.name}`, { method: 'GET' }, { withMessage: true }));
    updateProduct((product) => { product.slug = slug; })
  }

  async function updateProductField (e: FormEvent<HTMLInputElement>) {
    updateObjectField(e, product, (p, v) => {
      updateProduct((product) => {
          if (typeof v === typeof product[p]) {
            (product[p] as typeof v) = v;
          }
      });
    })
  }

  async function update (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    frontRequest(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(product)
    }, { withMessage: true });
  }

  return <div className={styles.product}>
    <div className={styles.product__main}>
      <form onSubmit={update}>
        <fieldset>
          <legend>Базовая информация</legend>
          <label>
            Название:
            <input name='name' type='text' value={product.name} onInput={updateProductField} />
          </label>
          <label>
            Артикул:
            <input name='article' type='text' value={product.article ?? ''} onInput={updateProductField} />
          </label>
          <label>
            Slug (Адрес):
            <input name='slug' type='text' disabled={true} value={product.slug ?? ''} style={{ color: '#000' }} /> <BoltIcon title='Сгенерировать slug' onClick={getSlug} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Размеры</legend>
          <label>
            Вес (кг):
            <input name='weight' type='number' value={product.weight} onInput={updateProductField} />
          </label>
          <label>
            Длина (см):
            <input name='length' type='number' value={product.length} onInput={updateProductField} />
          </label>
          <label>
            Ширина (см):
            <input name='width' type='number' value={product.width} onInput={updateProductField} />
          </label>
          <label>
            Высота (см):
            <input name='height' type='number' value={product.height} onInput={updateProductField} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Описание</legend>
          <ControlsEditor value={product.description ?? ''} onInput={(text) => { updateProduct((product) => { product.description = text; });} } />
        </fieldset>
        <Button type='submit'>Сохранить</Button>
      </form>
    </div>
    <div className={styles.product__additional}>
      <form>
        <fieldset>
          <legend>Seo базовая информация</legend>
          <label>
            Название:
            <input defaultValue={seo.name} />
          </label>
          <label>
            Ключевые слова:
            <input defaultValue={seo.keywords ?? ''} />
          </label>
        </fieldset>
        <fieldset>
            <legend>
              Seo описание
            </legend>
            <ControlsEditor value={seo.description ?? ''} />
        </fieldset>
        <Button type='submit'>Сохранить</Button>
      </form>
    </div>
  </div>;
}

interface Props {
  product: ProductEdit;
}
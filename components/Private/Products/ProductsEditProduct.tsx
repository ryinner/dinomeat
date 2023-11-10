'use client';

import { PropertyWithValuesAndProducts } from '@/@types/private';
import Button from "@/components/Button/Button";
import ControlsEditor from "@/components/Controls/ControlsEditor";
import BoltIcon from "@/components/Icons/BoltIcon";
import { frontRequest } from "@/services/api/api.service";
import { updateObjectField } from "@/services/dom/input";
import { Product } from "@prisma/client";
import { FormEvent } from "react";
import { useImmer } from "use-immer";
import styles from './ProductsEditProduct.module.scss';
import ProductsEditProperties from './ProductsEditProperties';

export default function ProductsEditProduct({
  product: initialProduct,
  properties
}: Props) {
  const [product, updateProduct] = useImmer(initialProduct);

  async function clickSlugHandler() {
    const { slug } = await frontRequest<{ slug: string }>(
      `/api/admin/slug?text=${product.name}`,
      { method: "GET" },
      { withMessage: true }
    );
    updateProduct((product) => {
      product.slug = slug;
    });
  }

  async function updateProductField(e: FormEvent<HTMLInputElement>) {
    updateObjectField(e, product, (p, v) => {
      updateProduct((product) => {
        (product[p] as typeof v) = v;
      });
    });
  }

  async function submitProductHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    frontRequest(
      `/api/admin/products/${product.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ data: product }),
      },
      { withMessage: true }
    );
  }

  return (
    <form onSubmit={submitProductHandler}>
      <div className={styles['product-edit-info']}>
        <div>
          <fieldset>
            <legend>Базовая информация</legend>
            <label>
              Название:
              <input
                name="name"
                type="text"
                value={product.name}
                onInput={updateProductField}
              />
            </label>
            <label>
              Артикул:
              <input
                name="article"
                type="text"
                value={product.article ?? ""}
                onInput={updateProductField}
              />
            </label>
            <label>
              Slug (Адрес):
              <div>
                <input
                  name="slug"
                  type="text"
                  disabled={product.published}
                  value={product.slug ?? ""}
                  onInput={updateProductField}
                  style={{ color: "#000", width: "calc(100% - 20px)"}}
                />
                {!product.published && <BoltIcon onClick={clickSlugHandler} />}
              </div>
            </label>
          </fieldset>
          <fieldset>
            <legend>Размеры</legend>
            <label>
              Вес (кг):
              <input
                name="weight"
                type="number"
                value={product.weight}
                onInput={updateProductField}
              />
            </label>
            <label>
              Длина (см):
              <input
                name="length"
                type="number"
                value={product.length}
                onInput={updateProductField}
              />
            </label>
            <label>
              Ширина (см):
              <input
                name="width"
                type="number"
                value={product.width}
                onInput={updateProductField}
              />
            </label>
            <label>
              Высота (см):
              <input
                name="height"
                type="number"
                value={product.height}
                onInput={updateProductField}
              />
            </label>
          </fieldset>
        </div>
        <div>
          <ProductsEditProperties id={product.id} properties={properties} />
        </div>
      </div>
      <fieldset>
        <legend>Описание</legend>
        <ControlsEditor
          value={product.description ?? ""}
          onInput={(text) => {
            updateProduct((product) => {
              product.description = text;
            });
          }}
        />
      </fieldset>
      <Button type="submit">Сохранить</Button>
    </form>
  );
}

interface Props {
  product: Product;
  properties: PropertyWithValuesAndProducts[];
}

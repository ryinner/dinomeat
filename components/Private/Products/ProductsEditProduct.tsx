"use client";

import { ProductEdit, PropertyWithValuesAndProducts, SizeWithProducts } from "@/@types/private";
import Button from "@/components/Button/Button";
import ControlsEditor from "@/components/Controls/ControlsEditor";
import ControlsSelect from "@/components/Controls/ControlsSelect";
import BoltIcon from "@/components/Icons/BoltIcon";
import { frontRequest } from "@/services/api/api.service";
import { updateObjectField } from "@/services/dom/input";
import { Category, Prisma, Product } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useImmer } from "use-immer";
import styles from "./ProductsEditProduct.module.scss";
import ProductsEditPropertiesItem from "./ProductsEditPropertiesItem";
import ProductsEditSizeItem from './ProductsEditSizeItem';

export default function ProductsEditProduct({
  product: initialProduct,
  properties: initialProperties,
  sizes,
  categories,
}: Props) {
  const [product, updateProduct] = useImmer(initialProduct);
  const [properties, setProperties] = useState(initialProperties);

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

  async function updateProductField(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    updateObjectField(e, product, (p, v) => {
      updateProduct((product) => {
        (product[p] as typeof v) = v;
      });
    });
  }

  async function submitProductHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const propertiesData =
      properties.reduce<Prisma.ProductPropertyUpdateManyWithoutProductNestedInput>(
        (prev, p) => {
          if (p.products[0]?.id === undefined) {
            if (typeof p.products[0]?.valueId === "number") {
              if (prev.createMany === undefined) {
                prev.createMany = { data: [] };
              }
              if (Array.isArray(prev.createMany.data)) {
                prev.createMany.data.push({
                  valueId: p.products[0].valueId,
                  propertyId: p.id,
                });
              }
            }
          } else {
            if (p.products[0].valueId === undefined) {
              if (!Array.isArray(prev.delete)) {
                prev.delete = [];
              }
              prev.delete.push({
                id: p.products[0].id,
              });
            } else {
              if (!Array.isArray(prev.updateMany)) {
                prev.updateMany = [];
              }
              prev.updateMany.push({
                data: {
                  valueId: p.products[0].valueId,
                },
                where: {
                  id: p.products[0].id,
                },
              });
            }
          }
          return prev;
        },
        {}
      );

    frontRequest<{ product: ProductEdit }>(
      `/api/admin/products/${product.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          data: { ...product, properties: propertiesData },
        }),
      },
      { withMessage: true }
    ).then((res) => {
      setProperties(res.product.properties);
    });
  }

  function publishProductHandler() {
    frontRequest(
      `/api/admin/products/${product.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ data: { published: true } }),
      },
      { withMessage: true }
    ).then(() => {
      updateProduct((product) => {
        product.published = true;
      });
    });
  }

  function unPublishProductHandler () {
    frontRequest(
      `/api/admin/products/${product.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ data: { published: false } }),
      },
      { withMessage: true }
    ).then(() => {
      updateProduct((product) => {
        product.published = false;
      });
    });
  }

  function propertyUpdateHandler(
    property: PropertyWithValuesAndProducts,
    valueId?: string
  ) {
    setProperties((properties) =>
      properties.map((p) => {
        if (p.id === property.id) {
          return {
            ...p,
            products: [
              {
                id: property.products[0]?.id,
                productId: product.id,
                propertyId: p.id,
                valueId: valueId === "" ? undefined : Number(valueId),
              },
            ],
          };
        }
        return p;
      })
    );
  }

  return (
    <form onSubmit={submitProductHandler}>
      <div className={styles["product-edit-info"]}>
        <div>
          <fieldset>
            <legend>Базовая информация</legend>
            <label>
              Название:
              <input
                name="name"
                type="text"
                value={product.name}
                onChange={updateProductField}
              />
            </label>
            <label>
              Артикул:
              <input
                name="article"
                type="text"
                value={product.article ?? ""}
                onChange={updateProductField}
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
                  onChange={updateProductField}
                  style={{ color: "#000", width: "calc(100% - 20px)" }}
                />
                {!product.published && <BoltIcon onClick={clickSlugHandler} />}
              </div>
            </label>
            <label>
              Цена:
              <input
                name="price"
                type="number"
                value={product.price ?? 1}
                onChange={updateProductField}
              />
            </label>
            <label>
              Категория:
              <ControlsSelect
                value={product.categoryId ?? undefined}
                onChange={updateProductField}
                type="number"
                name="categoryId"
                empty="Выберите категорию"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </ControlsSelect>
            </label>
          </fieldset>
          <fieldset>
            <legend>
              Наличие
            </legend>
            {
              sizes.map(s => <ProductsEditSizeItem key={s.id} product={product} size={s} />)
            }
          </fieldset>
        </div>
        <div>
        <fieldset>
            <legend>Размеры</legend>
            <label>
              Вес (кг):
              <input
                name="weight"
                type="number"
                value={product.weight}
                onChange={updateProductField}
              />
            </label>
            <label>
              Длина (см):
              <input
                name="length"
                type="number"
                value={product.length}
                onChange={updateProductField}
              />
            </label>
            <label>
              Ширина (см):
              <input
                name="width"
                type="number"
                value={product.width}
                onChange={updateProductField}
              />
            </label>
            <label>
              Высота (см):
              <input
                name="height"
                type="number"
                value={product.height}
                onChange={updateProductField}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Характеристики</legend>
            {properties.map((p) => (
              <ProductsEditPropertiesItem
                key={p.id}
                property={p}
                onUpdate={propertyUpdateHandler}
              />
            ))}
          </fieldset>
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
      {!product.published && product.slug !== null && product.slug.length > 0 && (
        <Button type="button" onClick={publishProductHandler}>
          Опубликовать
        </Button>
      )}
      {product.published && (
        <Button type="button" onClick={unPublishProductHandler}>
          Снять с публикации
        </Button>
      )}
    </form>
  );
}

interface Props {
  product: Product;
  properties: PropertyWithValuesAndProducts[];
  sizes: SizeWithProducts[];
  categories: Category[];
}

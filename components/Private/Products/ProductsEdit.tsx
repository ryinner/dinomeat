"use client";

import { ProductEdit, ProductSeoWithSeo } from "@/@types/private";
import Button from "@/components/Button/Button";
import ControlsEditor from "@/components/Controls/ControlsEditor";
import BoltIcon from "@/components/Icons/BoltIcon";
import { frontRequest } from "@/services/api/api.service";
import { updateObjectField } from "@/services/dom/input";
import { FormEvent } from "react";
import { useImmer } from "use-immer";
import styles from "./ProductsEdit.module.scss";

export function ProductsEdit({ product: initialProduct }: Props) {
  const {
    seo: initialSeoList,
    images: initialImages,
    properties: initialProperties,
    ...productData
  } = initialProduct;

  const [initialSeo] = initialSeoList;

  const [product, updateProduct] = useImmer(productData);
  const [images, updateImages] = useImmer(initialImages);
  const [seo, updateSeo] = useImmer(
    initialSeo?.seo ?? { name: "", keywords: "", description: "" }
  );

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

  async function updateSeoField(e: FormEvent<HTMLInputElement>) {
    updateObjectField(e, seo, (p, v) => {
      updateSeo((seo) => {
        (seo[p] as typeof v) = v;
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

  async function submitSeoHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (seo.id) {
      frontRequest(
        `/api/admin/seo/${seo.id}`,
        {
          method: "PUT",
          body: JSON.stringify(seo),
        },
        { withMessage: true }
      );
    } else {
      frontRequest<{ product: { seo: ProductSeoWithSeo[] } }>(
        `/api/admin/products/${product.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              seo: {
                create: {
                  seo: {
                    create: seo,
                  },
                },
              },
            },
            select: { seo: { include: { seo: true } } },
          }),
        },
        { withMessage: true }
      ).then((res) => {
        updateSeo((seo) => {
          seo.id = res.product.seo[0].seo.id;
        });
      });
    }
  }

  return (
    <div className={styles.product}>
      <div className={styles.product__main}>
        <form onSubmit={submitProductHandler}>
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
              <input
                name="slug"
                type="text"
                disabled={true}
                value={product.slug ?? ""}
                style={{ color: "#000" }}
              />{" "}
              <BoltIcon onClick={clickSlugHandler} />
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
      </div>
      <div className={styles.product__additional}>
        <form onSubmit={submitSeoHandler}>
          <fieldset>
            <legend>Seo базовая информация</legend>
            <label>
              Название:
              <input
                name="name"
                type="text"
                value={seo.name}
                onInput={updateSeoField}
              />
            </label>
            <label>
              Ключевые слова:
              <input
                name="keywords"
                type="text"
                value={seo.keywords ?? ""}
                onInput={updateSeoField}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Seo описание</legend>
            <ControlsEditor
              value={seo.description ?? ""}
              onInput={(text) => {
                updateSeo((seo) => {
                  seo.description = text;
                });
              }}
            />
          </fieldset>
          <Button type="submit">Сохранить</Button>
        </form>
      </div>
    </div>
  );
}

interface Props {
  product: ProductEdit;
}

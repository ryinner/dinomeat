"use client";

import { ProductEdit } from "@/@types/private";
import { Category } from '@prisma/client';
import styles from "./ProductsEdit.module.scss";
import ProductsEditImages from './ProductsEditImages';
import ProductsEditProduct from './ProductsEditProduct';
import ProductsEditSeo from './ProductsEditSeo';

export function ProductsEdit({ product, categories }: Props) {
  const {
    seo,
    images,
    properties,
    sizes,
    ...productData
  } = product;

  const [initialSeo] = seo;

  return (
    <div className={styles.product}>
      <div className={styles.product__main}>
        <ProductsEditProduct product={productData} properties={properties} categories={categories} sizes={sizes} />
      </div>
      <div className={styles.product__additional}>
        <ProductsEditSeo id={productData.id} seo={initialSeo?.seo} />
      </div>
      <div className={styles.product__images}>
        <ProductsEditImages id={productData.id} images={images} />
      </div>
    </div>
  );
}

interface Props {
  product: ProductEdit;
  categories: Category[];
}

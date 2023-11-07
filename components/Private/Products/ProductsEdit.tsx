"use client";

import { ProductEdit } from "@/@types/private";
import { useImmer } from "use-immer";
import styles from "./ProductsEdit.module.scss";
import ProductsEditProduct from './ProductsEditProduct';
import ProductsEditSeo from './ProductsEditSeo';

export function ProductsEdit({ product: initialProduct }: Props) {
  const {
    seo: initialSeoList,
    images: initialImages,
    properties: initialProperties,
    ...productData
  } = initialProduct;

  const [initialSeo] = initialSeoList;

  const [images, updateImages] = useImmer(initialImages);

  return (
    <div className={styles.product}>
      <div className={styles.product__main}>
        <ProductsEditProduct product={productData} />
      </div>
      <div className={styles.product__additional}>
        <ProductsEditSeo id={initialProduct.id} seo={initialSeo?.seo} />
      </div>
    </div>
  );
}

interface Props {
  product: ProductEdit;
}

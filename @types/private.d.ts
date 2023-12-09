import type { Image, Product, ProductImage, ProductProperty, ProductSeo, ProductSize, Property, Seo, Size, Value } from '@prisma/client';
import React from 'react';

export type PropertyWithValues = Property & { values: Value[] }
export type ProductSeoWithSeo = ProductSeo & { seo: Seo }
export type ProductImagesWithImages = ProductImage & { image: Image };
export type PropertyWithValuesAndProducts = PropertyWithValues & { products: Partial<ProductProperty>[] };
export type SizeWithProducts = Size & { products: ProductSize[] }
export type ProductWithSizes = Product & { sizes: SizeWithProducts[] }

export type ProductEdit = Product & { seo: ProductSeoWithSeo[]; images: ProductImagesWithImages[]; properties: PropertyWithValuesAndProducts[]; sizes: SizeWithProducts[] };
export type ProductCatalog = Product & { images: ProductImagesWithImages[] };

export type PriceFilter = { min: number, max: number };

export interface Toast {
  timeout: number | false;
  children: React.ReactNode; 
}
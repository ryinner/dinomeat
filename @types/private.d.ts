import type { Image, Product, ProductImage, ProductProperty, ProductSeo, Property, Seo, Value } from '@prisma/client';

export type PropertyWithValues = Property & { values: Value[] }
export type ProductSeoWithSeo = ProductSeo & { seo: Seo }
export type ProductImagesWithImages = ProductImage & { image: Image };
export type PropertyWithValuesAndProducts = PropertyWithValues & { products: Partial<ProductProperty>[] };

export type ProductEdit = Product & { seo: ProductSeoWithSeo[]; images: ProductImagesWithImages[]; properties: PropertyWithValuesAndProducts[] };
export type ProductCatalog = Product & { images: ProductImagesWithImages[] };

export type PriceFilter = { min: number, max: number };
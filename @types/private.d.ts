import type { Image, Product, ProductImage, ProductSeo, Property, Seo, Value } from '@prisma/client';

export type PropertyWithValues = Property & { values: Value[] }
export type ProductSeoWithSeo = ProductSeo & { seo: Seo }
export type ProductImagesWithImages = ProductImage & { image: Image };

export type ProductEdit = Product & { seo: ProductSeoWithSeo[]; images: ProductImagesWithImages[]; properties: [] };
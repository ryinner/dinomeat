import type { Image, Product, ProductSeo, Property, Seo, Value } from '@prisma/client';

export type PropertyWithValues = Property & { values: Value[] }
export type ProductSeoWithSeo = ProductSeo & { seo: Seo }

export type ProductEdit = Product & { seo: ProductSeoWithSeo[]; images: Image[]; properties: [] };
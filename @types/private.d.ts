import type { Image, Product, Property, Seo, Value } from '@prisma/client';

export type PropertyWithValues = Property & { values: Value[] }

export type ProductEdit = Product & { seo: Seo[]; images: Image[]; };
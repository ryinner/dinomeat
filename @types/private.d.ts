import type { Banner, Category, Employer, Image, OrdersProductsSizes, Product, ProductImage, ProductProperty, ProductSeo, ProductSize, Property, Seo, Size, User, Value } from '@prisma/client';

export type PropertyWithValues = Property & { values: Value[] }
export type ProductSeoWithSeo = ProductSeo & { seo: Seo }
export type ProductImagesWithImages = ProductImage & { image: Image };
export type PropertyWithValuesAndProducts = PropertyWithValues & { products: Partial<ProductProperty>[] };
export type SizeWithProducts = Size & { products: ProductSize[] }
export type ProductWithSizes = Product & { sizes: SizeWithProducts[] }
export type ProductsPropertiesWithPropertyAndValue = ProductProperty & { property: Property; value: Value };
export type ProductSizeWithSize = ProductSize & { size: Size };
export type ProductSizeWithSizeAndProduct = ProductSizeWithSize & { product: Product };

export type ProductEdit = Product & { seo: ProductSeoWithSeo[]; images: ProductImagesWithImages[]; properties: PropertyWithValuesAndProducts[]; sizes: SizeWithProducts[] };
export type ProductCatalog = Product & { images: ProductImagesWithImages[] };

export type PriceFilter = { min: number, max: number };

export type ProductCatalogShow = Product & { seo: ProductSeoWithSeo[], images: ProductImagesWithImages[]; properties: ProductsPropertiesWithPropertyAndValue[]; sizes: ProductSizeWithSize[]; category: Category }

export type ProductCart = ProductSizeWithSize & { product: (Product & { images: ProductImagesWithImages[] }) } & { amount: number };

export type SiteUser = Pick<User, "id" | "email" | "name" | "phone">;

export type BannerWithImage = Banner & { image: Image };
export type EmployerWithImage = Employer & { image: Image };

export type OrdersProductsSizesEdit = OrdersProductsSizes & { productSize: ProductSizeWithSizeAndProduct };
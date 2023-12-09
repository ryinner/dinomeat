import { ProductCatalogShow } from '@/@types/private';
import { request } from '@/services/api/api.service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

async function getData (slug: string) {
  const { product } = (await request<{ product: ProductCatalogShow }>(`/api/products/${slug}`));

  if (!product) {
    notFound();
  }

  return product;
}

export async function generateMetadata ({ params: { slug } }: { params: PageParams }): Promise<Metadata> {
  const product = await getData(slug);

  const [seo] = product.seo;

  const title = seo?.seo?.name ?? product.name;
  const description = seo?.seo?.description ?? null;
  const keywords = seo?.seo?.keywords ?? null;
  const category = product.category.name;

  return {
    title,
    description,
    keywords,
    category
  }
}

export default async function Product ({ params: { slug } }: { params: PageParams }) {
  const product = await getData(slug);

  return <section className={styles.product}>
    <h1 className={styles.product__heading}>{product.name}</h1>
  </section>;
}

interface PageParams {
  slug: string;
}
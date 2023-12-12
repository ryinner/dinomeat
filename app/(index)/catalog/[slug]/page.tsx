import { ProductCatalogShow } from '@/@types/private';
import ProductImages from '@/components/Catalog/ProductImages';
import ProductMainInfo from '@/components/Catalog/ProductMainInfo';
import { request } from '@/services/api/api.service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

async function getData (slug: string) {
  const { product } = (await request<{ product: ProductCatalogShow }>(`/api/products/${slug}`, { next: {
    revalidate: 10
  } }));

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
  const category = product?.category?.name ?? null;

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
    <div className={styles.product__content}>
      <div className={styles.product__second}>
        <ProductImages images={product.images} />
      </div>
      <div className={styles.product__main}>
        <ProductMainInfo product={product} />
      </div>
      <div className={styles.product__description}>
        <h2 className={styles[`product__heading-second`]}>О товаре</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description ?? '' }} />
      </div>
    </div>
  </section>;
}

interface PageParams {
  slug: string;
}
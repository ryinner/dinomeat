import type { ProductEdit } from '@/@types/private';
import { ProductsEdit } from '@/components/Private/Products/ProductsEdit';
import { request } from '@/services/api/api.service';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

async function getData (id: number) {
  const cookie = cookies();

  return await request<{product: ProductEdit}>(`/api/admin/products/${id}`, {
    next: {
      revalidate: 60
    },
    headers: {
      Cookie: cookie.toString()
    }
  })
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = params; 

  const { product } = (await getData(Number(id)));

  const [seo] = product.seo

  const title = seo?.name ?? product.name;
  const description = seo?.description;

  return {
    title,
    description
  }
}

export default async function TheProductEdit ({ params }: { params: PageParams }) {
  const { id } = params;
  const { product } = (await getData(Number(id)));

  return <ProductsEdit product={product} />
}

interface PageParams {
  id: string;
}
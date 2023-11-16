import type { ProductEdit } from '@/@types/private';
import { ProductsEdit } from '@/components/Private/Products/ProductsEdit';
import { request } from '@/services/api/api.service';
import { Category } from '@prisma/client';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

async function getData (id: number) {
  const cookie = cookies();

  return await request<{product: ProductEdit, categories: Category[]}>(`/api/admin/products/${id}`, {
    next: {
      revalidate: 10
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

  const title = seo?.seo?.name ?? product.name;
  const description = seo?.seo?.description;

  return {
    title,
    description
  }
}

export default async function TheProductEdit ({ params }: { params: PageParams }) {
  const { id } = params;
  const { product, categories } = (await getData(Number(id)));

  return <ProductsEdit product={product} categories={categories} />
}

interface PageParams {
  id: string;
}
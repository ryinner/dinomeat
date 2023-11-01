import { request } from '@/services/api/api.service';
import { Product, Seo } from '@prisma/client';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

async function getData (id: number) {
  const cookie = cookies();

  return await request<{product: Product & { seo: Seo[] }}>(`/api/admin/products/${id}`, {
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

  const product = (await getData(Number(id))).product;

  const [seo] = product.seo

  const title = seo?.name ?? product.name;
  const description = seo?.description;

  return {
    title,
    description
  }
}

export default function TheProductEdit ({ params }: { params: PageParams }) {
  return <></>
}

interface PageParams {
  id: string;
}
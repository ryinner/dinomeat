import { getAllProducts } from '@/services/orm/products.service';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const map: MetadataRoute.Sitemap = products.map((p) => ({
    url: getUrl(`/catalog/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: process.env.NEXT_PUBLIC_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: getUrl('/delivery'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: getUrl('/contacts'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getUrl('/catalog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...map
  ];
}

function getUrl (url: string) {
  return `${process.env.NEXT_PUBLIC_URL}${url}`
}
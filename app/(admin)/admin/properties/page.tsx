import { request } from '@/services/api/api.service';
import { Property, Value } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Параметры',
  description: 'Страница редактирования параметров'
}

export default async function ThePropertiesListView ({ searchParams }: Params) {
  const { properties } = (await request<PropertiesList>(`/api/properties?page=${searchParams.page ?? 1}`, {
    cache: "no-cache",
  }));
  console.log(properties);
  return <></>
}

interface PropertiesList {
  properties: (Property & { values: Value[] })[]
}

interface Params {
  searchParams: {
    page?: number;
  }
}
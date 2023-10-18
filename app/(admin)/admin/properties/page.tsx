import type { PropertyWithValues } from '@/@types/private';
import PropertiesTable from '@/components/Private/Properties/PropertiesTable';
import { request } from '@/services/api/api.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Параметры',
  description: 'Страница редактирования параметров'
}

export default async function ThePropertiesListView ({ searchParams }: Params) {
  const { properties } = (await request<PropertiesList>(`/api/properties?page=${searchParams.page ?? 1}`, {
    cache: "no-cache",
  }));
  return <PropertiesTable properties={properties} />
}

interface PropertiesList {
  properties: PropertyWithValues[]
}

interface Params {
  searchParams: {
    page?: number;
  }
}
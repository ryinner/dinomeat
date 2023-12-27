import Pagination from '@/components/Pagination/Pagination';
import BannersTable from '@/components/Private/Banners/BannersTable';
import { getBannersPaginated } from '@/services/orm/banners.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Баннеры",
  description: "Страница перечисления всех баннеров",
};

export default async function BannersList ({ searchParams: { page = '1' } }: Params) {
  const { pagination, banners } = (await getBannersPaginated({ page: Number(page) }));

  return <>
    <BannersTable banners={banners} />
    <Pagination {...pagination} />
  </>
}

interface Params {
  searchParams: {
    page?: string;
  }
}
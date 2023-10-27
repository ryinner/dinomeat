import Pagination from "@/components/Pagination/Pagination";
import PropertiesTable from "@/components/Private/Properties/PropertiesTable";
import { getPropertiesPaginated } from "@/services/orm/properties.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Параметры",
  description: "Страница редактирования параметров",
};

export default async function ThePropertiesListView({ searchParams }: Params) {
  const { properties, pagination } = await getPropertiesPaginated({
    page: Number(searchParams.page ?? 1),
  });

  return (
    <>
      <PropertiesTable properties={properties} />
      <Pagination {...pagination} />
    </>
  );
}

interface Params {
  searchParams: {
    page?: number;
  };
}

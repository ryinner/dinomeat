import Pagination from '@/components/Pagination/Pagination';
import OrdersTable from '@/components/Private/Orders/OrdersTable';
import { getOrdersPaginated } from "@/services/orm/orders.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заказы",
  description: "Страница перечисления всех заказов",
};

export default async function OrdersList({ searchParams: { page } }: Params) {
  const { orders, pagination } = await getOrdersPaginated({
    page: Number(page ?? 1),
  });

  return <>
    <OrdersTable orders={orders} />
    <Pagination {...pagination} />
  </>;
}

interface Params {
  searchParams: {
    page?: number;
  };
}

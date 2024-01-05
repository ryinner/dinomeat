import OrderEdit from '@/components/Private/Orders/OrderEdit';
import { getForEdit } from "@/services/orm/orders.service";
import { Metadata } from "next";

export function generateMetadata({ params: { id } }: Params): Metadata {
  return {
    title: `Заказ № ${id}`,
  };
}

export default async function OrderPage({ params: { id } }: Params) {
  const { productsSizes, ...order } = (await getForEdit(Number(id)));

  return <OrderEdit order={order} sizes={productsSizes} />;
}

interface Params {
  params: {
    id: string;
  };
}

import OrderEditInfo from '@/components/Private/Orders/OrderEditInfo';
import OrderEditProducts from '@/components/Private/Orders/OrderEditProducts';
import { getForEdit } from "@/services/orm/orders.service";
import { Metadata } from "next";

export function generateMetadata({ params: { id } }: Params): Metadata {
  return {
    title: `Заказ № ${id}`,
  };
}

export default async function OrderPage({ params: { id } }: Params) {
  const { productsSizes, ...order } = (await getForEdit(Number(id)));

  return <div>
      <OrderEditInfo order={order} />
      <OrderEditProducts sizes={productsSizes} />
  </div>;
}

interface Params {
  params: {
    id: string;
  };
}

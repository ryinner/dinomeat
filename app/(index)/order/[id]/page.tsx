import OrderInfo from '@/components/Order/OrderInfo';
import OrderProducts from '@/components/Order/OrderProducts';
import { getForEdit } from '@/services/orm/orders.service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

export function generateMetadata({ params: { id } }: Params): Metadata {
  return {
    title: `Заказ № ${id} | Dinomeät`,
    description: "Интернет-магазине dinomeät. Быстрая доставка. Лучшие товары.",
  };
}

export default async function Order ({ params: { id } }: Params) {
  try {
    const { productsSizes, ...order } = await getForEdit(Number(id));

    return <section className={styles.order}>
      <div className={styles.order__heading}>Информация о заказе</div>
      <div className={`${styles.order__heading} not-mobile`}>Товары</div>
      <OrderInfo order={order} />
      <OrderProducts sizes={productsSizes} />
    </section>
  } catch (error) {
    notFound();
  }
}

interface Params {
  params: {
    id: string;
  }
}
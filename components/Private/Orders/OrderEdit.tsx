import { OrdersProductsSizesEdit } from "@/@types/private";
import { Order } from "@prisma/client";
import styles from './OrderEdit.module.scss';
import OrderEditInfo from "./OrderEditInfo";
import OrderEditProducts from "./OrderEditProducts";

export default function OrderEdit({ order, sizes }: Props) {
  return (
    <div className={styles.order}>
      <OrderEditInfo order={order} />
      <OrderEditProducts sizes={sizes} />
    </div>
  );
}

interface Props {
  order: Order;
  sizes: OrdersProductsSizesEdit[];
}

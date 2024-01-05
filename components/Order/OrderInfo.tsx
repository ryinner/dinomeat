import { ordersStatusesMap } from '@/shared/maps/orderStatuses.map';
import { Order } from "@prisma/client";
import styles from "./OrderInfo.module.scss";

const infoFields: {
  name: string;
  field: Exclude<keyof Order, "createdAt" | "updatedAt">;
}[] = [
  {
    field: "username",
    name: "Получатель",
  },
  {
    field: "email",
    name: 'Почта'
  },
  {
    field: 'phone',
    name: 'Телефон'
  },
  {
    field: 'city',
    name: 'Город'
  },
  {
    field: 'address',
    name: 'Адрес доставки'
  }
  ,
  {
    field: 'tracker',
    name: 'Трекер доставки'
  }
];

export default function OrderInfo({ order }: Props) {
  return (
    <section className={styles.info}>
      <div className={styles.info__container}>
        {infoFields.map((i) => (
          <div key={i.field}>
            {i.name}: {order[i.field]}
          </div>
        ))}
        <div>
          Статус: {ordersStatusesMap[order.status].name}
        </div>
      </div>
    </section>
  );
}

interface Props {
  order: Order;
}

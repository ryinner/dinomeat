import { ordersStatusesMap } from '@/shared/maps/orderStatuses.map';
import { Order } from '@prisma/client';
import Link from 'next/link';

export default function OrdersTable ({ orders }: Props) {
  return <table>
    <thead>
      <tr>
        <th>id</th>
        <th>Заказчик</th>
        <th>Телефон</th>
        <th>Email</th>
        <th>Адрес</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(o => <tr key={o.id}>
        <td>
          <Link href={`/admin/orders/${o.id}`}>
            {o.id}
          </Link>
        </td>
        <td>
          <Link href={`/admin/orders/${o.id}`}>
            {o.username}
          </Link>
        </td>
        <td>
          {o.phone}
        </td>
        <td>{o.email}</td>
        <td>
          г. {o.city}, {o.address}
        </td>
        <td>
          {ordersStatusesMap[o.status].name}
        </td>
      </tr>)}
    </tbody>
  </table>
}

interface Props {
  orders: Order[];
}
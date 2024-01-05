import { OrdersStatuses } from '@prisma/client';

const ordersStatusesMap = {
  [OrdersStatuses.Created]: {
    id: OrdersStatuses.Created,
    name: 'В обработке'
  },
  [OrdersStatuses.Completed]: {
    id: OrdersStatuses.Completed,
    name: 'Завершен'
  },
  [OrdersStatuses.Declined]: {
    id: OrdersStatuses.Declined,
    name: 'Отменен'
  },
};

export {
  ordersStatusesMap
};

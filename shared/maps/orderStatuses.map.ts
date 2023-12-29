import { OrdersStatuses } from '@prisma/client';

const ordersStatusesMap = {
  [OrdersStatuses.Created]: {
    name: 'Создан'
  },
  [OrdersStatuses.Completed]: {
    name: 'Завершен'
  },
  [OrdersStatuses.Declined]: {
    name: 'Отменен'
  },
};

export {
  ordersStatusesMap
};

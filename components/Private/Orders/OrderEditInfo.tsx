'use client'

import Button from "@/components/Button/Button";
import ControlsSelect from "@/components/Controls/ControlsSelect";
import { usePropsState } from '@/hooks/StateHooks';
import { frontRequest } from '@/services/api/api.service';
import { updateObjectField } from '@/services/dom/input';
import { ordersStatusesMap } from "@/shared/maps/orderStatuses.map";
import { Order } from "@prisma/client";
import { ChangeEvent, FormEvent } from 'react';

export default function OrderEditInfo({ order: initialOrder }: Props) {
  const [order, setOrder] = usePropsState(initialOrder);
  
  function changeField (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    updateObjectField(e, order, (p, v) => {
      setOrder((o) => ({ ...o, [p]: v }));
    });
  }

  function updateOrder(e: FormEvent) {
    e.preventDefault();
    frontRequest<{order: Order}>(`/api/admin/orders/${order.id}`, {
      method: 'PUT',
      body: JSON.stringify(order)
    }, { withMessage: true }).then(res => {
      setOrder(res.order);
    })
  }

  return (
    <form onSubmit={updateOrder}>
      <fieldset>
        <legend>Информация заказа</legend>
        <label>
          Клиент
          <input type="text" name='username' defaultValue={order.username} onChange={changeField} />
        </label>
        <label>
          Почта
          <input type="text" name='email' defaultValue={order.email} onChange={changeField} />
        </label>
        <label>
          Телефон
          <input type="text" name='phone' defaultValue={order.phone} onChange={changeField} />
        </label>
        <label>
          Город
          <input type="text" name='city' defaultValue={order.city} onChange={changeField} />
        </label>
        <label>
          Адрес
          <input type="text" name='address' defaultValue={order.address} onChange={changeField} />
        </label>
        <label>
          Трекер СДЭК
          <input type="text" name='tracker' defaultValue={order.tracker ?? ""} onChange={changeField} />
        </label>
        <label>
          Статус
          <ControlsSelect defaultValue={order.status} name='status' onChange={changeField}>
            {Object.values(ordersStatusesMap).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </ControlsSelect>
        </label>
        <div>
          <Button type='submit'>Сохранить</Button>
        </div>
      </fieldset>
    </form>
  );
}

interface Props {
  order: Order;
}

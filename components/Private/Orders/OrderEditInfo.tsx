import { Order } from "@prisma/client";

export default function OrderEditInfo({ order }: Props) {
  return (
    <form>
      <fieldset>
        <legend>Информация заказа</legend>
        <label>
          Клиент
          <input type="text" defaultValue={order.username} />
        </label>
      </fieldset>
    </form>
  );
}

interface Props {
  order: Order;
}

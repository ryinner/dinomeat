import { Order } from "@prisma/client";

export default function OrderEditInfo({ order }: Props) {
  return (
    <form>
      <fieldset>
        <legend>Информация заказа</legend>
      </fieldset>
    </form>
  );
}

interface Props {
  order: Order;
}
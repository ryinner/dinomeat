import { OrdersProductsSizesEdit } from "@/@types/private";

export default function OrderEditProducts({ sizes }: Props) {
  return (
    <form>
      <fieldset>
        <legend>Товары</legend>
      </fieldset>
    </form>
  );
}

interface Props {
  sizes: OrdersProductsSizesEdit[];
}

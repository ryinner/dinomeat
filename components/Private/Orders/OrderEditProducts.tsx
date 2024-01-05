import { OrdersProductsSizesEdit } from "@/@types/private";

export default function OrderEditProducts({ sizes }: Props) {
  return (
    <form>
      <fieldset>
        <legend>Товары</legend>
        <ul>
          {sizes.map(s => <span key={s.id}>
            {s.productSize.product.name} {s.productSize.product.article} - {s.amount} шт. - {s.sum} ₽
          </span>)}
        </ul>
      </fieldset>
    </form>
  );
}

interface Props {
  sizes: OrdersProductsSizesEdit[];
}

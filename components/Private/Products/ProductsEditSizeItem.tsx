import { SizeWithProducts } from "@/@types/private";
import ControlsCheckbox from "@/components/Controls/ControlsCheckbox";
import SaveIcon from "@/components/Icons/SaveIcon";
import { usePropsState } from "@/hooks/StateHooks";
import { frontRequest } from "@/services/api/api.service";
import { Product, ProductSize } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { toast } from 'react-toastify';
import styles from "./ProductsEditSizeItem.module.scss";

export default function ProductsEditSizeItem({
  size: initialSize,
  product,
}: Props) {
  const [size, setSize] = usePropsState(initialSize);
  const productRelation = size.products.find((p) => p.productId === product.id);
  const isRelatedToProduct = productRelation !== undefined;
  const [amount, setAmount] = useState(
    isRelatedToProduct ? productRelation.amount : 0
  );

  function changeRelateHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      frontRequest<{ relation: ProductSize }>(
        `/api/admin/products/${product.id}/sizes`,
        {
          method: "POST",
          body: JSON.stringify({ sizeId: size.id }),
        },
        { withMessage: true }
      ).then((res) => {
        setSize((size) => ({
          ...size,
          products: [...size.products, res.relation],
        }));
      });
    } else {
      frontRequest(
        `/api/admin/products-sizes/${productRelation?.id}`,
        {
          method: "DELETE",
        },
        { withMessage: true }
      ).then(() => {
        setSize({
          ...size,
          products: [],
        });
      });
    }
  }

  function changeAmountHandler(e: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  function saveHandler () {
    if (typeof amount === 'number') {
      frontRequest(`/api/admin/products-sizes/${productRelation?.id}`, {
        method: 'PUT',
        body: JSON.stringify({ amount })
      }, { withMessage: true });
    } else {
      toast('Количество продукта должно быть числом')
    }
  }

  return (
    <div className={styles.field}>
      <ControlsCheckbox
        className={styles.field__checkbox}
        inputAttrs={{
          checked: isRelatedToProduct,
          onChange: changeRelateHandler,
        }}
      >
        {size.name}
      </ControlsCheckbox>
      {isRelatedToProduct && (
        <>
          <input
            type="number"
            placeholder="Количество товара"
            defaultValue={amount}
            onChange={changeAmountHandler}
          />
          <SaveIcon onClick={saveHandler} />
        </>
      )}
    </div>
  );
}

interface Props {
  size: SizeWithProducts;
  product: Product;
}

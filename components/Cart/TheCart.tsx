"use client";

import { ProductCart } from "@/@types/private";
import { frontRequest } from "@/services/api/api.service";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../TheProviders/TheCartContext";
import CartProduct from "./CartProduct";
import styles from "./TheCart.module.scss";

export default function TheCart() {
  const { cart, updateCart } = useCart();
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRequested = useRef(false);

  const isCartEmpty = cart.length === 0;

  if (isCartEmpty && isLoading) {
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isRequested.current && !isCartEmpty) {
      isRequested.current = true;

      frontRequest<{ products: ProductCart[] }>(
        `/api/cart?ids=${cart.map((c) => c.id).join("|")}`,
        {
          method: "GET",
        },
        { withMessage: false }
      ).then((res) => {
        setProducts(res.products);
        setIsLoading(false);
      });
    }
  });

  return (
    <div className={styles.cart}>
      {isLoading ? (
        <p>Загрузка</p>
      ) : isCartEmpty ? (
        <p>Корзина пуста, добавьте товар</p>
      ) : (
        <div>
          {products.map((p) => (
            <CartProduct key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

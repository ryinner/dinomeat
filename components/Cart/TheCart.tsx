"use client";

import { ProductCart } from "@/@types/private";
import { frontRequest } from "@/services/api/api.service";
import { useEffect, useRef, useState } from "react";
import DefaultLink from '../Links/DefaultLink';
import { useCart } from "../TheProviders/TheCartContext";
import CartProduct from "./CartProduct";
import styles from "./TheCart.module.scss";

export default function TheCart() {
  const { cart, updateCart } = useCart();
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRequested = useRef(false);

  const cartSum = cart.reduce((sum, cartItem) => sum + cartItem.amount * (products.find(p => p.id === cartItem.id)?.product?.price ?? 0), 0);

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
          <div className={styles.cart__header}>
            <div>Оформить заказ</div>
            <div>Товары</div>
          </div>
          <div className={styles.cart__content}>
            <div>
              {/* Форма */}
            </div>
            <div>
              {products.map((p) => (
                <CartProduct key={p.id} product={p} />
              ))}
            </div>
          </div>
          <div className={styles.cart__footer}>
            <div className={styles.cart__total}>
              <span>К оплате:</span>
              <span className={styles.cart__price}>{cartSum} ₽</span>
            </div>
            <div className={styles.cart__buttons}>
              <DefaultLink href='/catalog'>Каталог</DefaultLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

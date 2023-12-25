"use client";

import { ProductCart, SiteUser } from "@/@types/private";
import { frontRequest } from "@/services/api/api.service";
import { useEffect, useRef, useState } from "react";
import TheCartForm from "../Forms/TheCartForm";
import DefaultLink from "../Links/DefaultLink";
import { useCart } from "../TheProviders/TheCartContext";
import CartProduct from "./CartProduct";
import styles from "./TheCart.module.scss";

export default function TheCart({ user }: Props) {
  const { cart, isInCart } = useCart();
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRequested = useRef(false);

  const cartSum = cart.reduce(
    (sum, cartItem) =>
      sum +
      cartItem.amount *
        (products.find((p) => p.id === cartItem.id)?.product?.price ?? 0),
    0
  );

  const isCartEmpty = cart.length === 0;

  if (isCartEmpty && isLoading) {
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isRequested.current && !isCartEmpty) {
      isRequested.current = true;
      setIsLoading(true);

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
  }, [isCartEmpty, cart, products, isInCart]);

  function removeHandler () {
    setProducts(products => products.filter(p => isInCart(p.id)));
  }

  return (
    <div className={styles.cart}>
      {isLoading ? (
        <p>Загрузка</p>
      ) : isCartEmpty ? (
        <p>Корзина пуста, добавьте товар</p>
      ) : (
        <div>
          <div className={styles.cart__header}>
            <div className={styles['cart__header-products']}>Товары:</div>
            <div className={styles['cart__header-form']}>Оформить заказ</div>
          </div>
          <div className={styles.cart__content}>
            <div className={styles.cart__products}>
              {products.map((p) => (
                <CartProduct key={p.id} product={p} onRemove={removeHandler} />
              ))}
            </div>
            <div className={styles.cart__form}>
              <TheCartForm user={user} cartSum={cartSum} />
            </div>
          </div>
          <div className={styles.cart__footer}>
            <div className={styles.cart__controls}>
              <DefaultLink href="/catalog" className={styles.cart__button}>
                Каталог
              </DefaultLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  user?: SiteUser;
}

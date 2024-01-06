"use client";

import { ProductCatalogShow } from "@/@types/private";
import Image from "next/image";
import { useState } from "react";
import ArrowDown from "../../public/icons/arrow-down.svg";
import ArrowRight from "../../public/icons/arrow-right-thin.svg";
import Button from "../Button/Button";
import DefaultLink from "../Links/DefaultLink";
import { useCart } from '../TheProviders/TheCartContext';
import styles from "./ProductMainInfo.module.scss";

export default function ProductMainInfo({ product }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { isInCart, addToCart, removeFromCart } = useCart();
  const inCart = selectedSize !== null ? isInCart(selectedSize) : null;
  let cartButtonText = '';

  switch (inCart) {
    case true:
      cartButtonText = 'Удалить из корзины';
      break;
    case false:
      cartButtonText = 'Добавить в корзину';
      break;
    default:
      cartButtonText = 'Выберите размер';
      break;
  }

  function toggleActive() {
    setIsActive((isActive) => !isActive);
  }

  function cartClickHandler() {
    if (inCart === null || selectedSize === null) {
      return;
    }
    if (!inCart) {
      addToCart(selectedSize);
    } else {
      removeFromCart(selectedSize);
    }
  }

  function selectSizeHandler (size: { id: number; amount: number }) {
    if (size.amount === 0) {
      return;
    }
    if (size.id === selectedSize) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size.id);
    }
  }

  return (
    <div className={styles.info}>
      <div className={styles.info__block} itemProp='offers' itemScope itemType='http://schema.org/Offer'>
        <span>Цена</span>
        <span className={`${styles.info__price} ${styles['info__price--first']}`} itemProp='price'>{product.price}</span> <span className={styles.info__price}>₽</span>
        <meta itemProp="priceCurrency" content="RUB" />
      </div>
      {product.category?.name && (
        <div className={styles.info__block}>{product.category.name}</div>
      )}
      <div className={`${styles.info__block} ${styles.info__properties}`}>
        <span onClick={toggleActive}>
          Характеристики <Image src={ArrowDown} alt="Раскрыть характеристики" />
        </span>
        <ul
          className={`${styles["info__list"]} ${
            isActive
              ? styles["info__list--visible"]
              : styles["info__list--hidden"]
          }`}
        >
          {product.properties.map((p) => (
            <li key={p.id} className={styles.info__property}>
              {p.property.name}: {p.value.value}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.info__block}>
        <span>Таблица размеров</span>
        <div className={styles.info__sizes}>
          {product.sizes.map((s) => (
            <span className={`${styles['info__size']} ${selectedSize === s.id && styles['info__size--selected']} ${s.amount === 0 && styles['info__size--disabled']}`} key={s.id} onClick={() => { selectSizeHandler(s); }}>{s.size.name}</span>
          ))}
        </div>
      </div>
      <div className={styles.info__controls}>
        <Button onClick={cartClickHandler}>
          {cartButtonText}
        </Button>
        <DefaultLink href="/catalog" className={styles.info__link}>
          В каталог{" "}
          <Image
            className={styles.info__arrow}
            src={ArrowRight}
            alt="В каталог"
          />
        </DefaultLink>
      </div>
    </div>
  );
}

interface Props {
  product: ProductCatalogShow;
}

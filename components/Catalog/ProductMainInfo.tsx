'use client'

import { ProductCatalogShow } from '@/@types/private';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ArrowDown from '../../public/icons/arrow-down.svg';
import ArrowRight from '../../public/icons/arrow-right-thin.svg';
import Button from '../Button/Button';
import DefaultLink from '../Links/DefaultLink';
import styles from './ProductMainInfo.module.scss';

export default function ProductMainInfo({ product }: Props) {
  const [isActive, setIsActive] = useState(false);

  function toggleActive () {
    setIsActive((isActive) => !isActive)
  }

  function addToCart () {
    toast('Функция в разработке!');
  }

  return <div className={styles.info}>
    <div className={styles.info__block}>
      <span>Цена</span>
      <span className={styles.info__price}>{product.price} ₽</span>
    </div>
    <div className={styles.info__block}>
      {product.category.name}
    </div>
    <div className={`${styles.info__block} ${styles.info__properties}`}>
      <span onClick={toggleActive}>Характеристики <Image src={ArrowDown} alt='Раскрыть характеристики' /></span>
        <ul className={`${styles['info__list']} ${isActive ? styles['info__list--visible'] : styles['info__list--hidden']}`}>
          {product.properties.map(p => <li key={p.id} className={styles.info__property}>{p.property.name}: {p.value.value}</li>)}
        </ul>
    </div>
    <div className={styles.info__block}>
      <span>Таблица размеров</span>
      <div className={styles.info__sizes}>
        {product.sizes.map(s => <span key={s.id}>{s.size.name}</span>)}
      </div>
    </div>
    <div className={styles.info__controls}>
      <Button onClick={addToCart}>Добавить в корзину</Button>
      <DefaultLink href='/catalog' className={styles.info__link}>В каталог <Image className={styles.info__arrow} src={ArrowRight} alt='В каталог' /></DefaultLink>
    </div>
  </div>
}

interface Props {
  product: ProductCatalogShow;
}
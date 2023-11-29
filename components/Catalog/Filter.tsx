"use client";

import { useClickOutside } from "@/hooks/DomHooks";
import Image from 'next/image';
import React, { useState } from "react";
import Arrow from '../../public/icons/arrow.svg';
import styles from "./Filter.module.scss";

export default function Filter({ children, heading }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const filter = useClickOutside<HTMLDivElement>(() => {
    closeHandler();
  });

  function openHandler() {
    setIsOpen(true);
  }

  function closeHandler() {
    setIsOpen(false);
  }

  return (
    <div className={`${styles.filter} ${isOpen && styles['filter--active']}`} ref={filter}>
      <div className={`${styles.filter__header} ${isOpen && styles['filter__header--active']}`} onClick={openHandler}>
        <span className={styles.filter__heading}>{heading}</span>
        <picture className={styles.filter__image}><Image className={styles.filter__image} src={Arrow} alt='Раскрыть фильтр' /></picture>
      </div>
      {isOpen && (<div className={styles.filter__content}>
        <div className={styles.filter__header} onClick={closeHandler}>
          <span className={styles.filter__heading}>{heading}</span>
          <picture className={`${styles.filter__image} ${styles['filter__image--active']}`}><Image className={styles.filter__image} src={Arrow} alt='Скрыть фильтр' /></picture>
        </div>
        <div className={styles.filter__controls}>
          {children}
        </div>
      </div>)}
    </div>
  );
}

interface Props {
  children: React.ReactNode;
  heading: string;
}

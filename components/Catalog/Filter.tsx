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

  function toggleHandler() {
    setIsOpen((isOpen) => !isOpen);
  }

  function closeHandler() {
    setIsOpen(false);
  }

  return (
    <div className={styles.filter} ref={filter} onClick={toggleHandler}>
      <span className={styles.filter__heading}>{heading}</span>
      <picture className={styles.filter__image}><Image className={styles.filter__image} src={Arrow} alt='Раскрыть фильтр' /></picture>
      {isOpen && <div className={styles.filter__content}>{children}</div>}
    </div>
  );
}

interface Props {
  children: React.ReactNode;
  heading: string;
}

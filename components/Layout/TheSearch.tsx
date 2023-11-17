'use client';

import Image from 'next/image';
import React, { useRef, type FormEvent } from "react";
import GoSearch from '../../public/icons/go-search.svg';
import Search from '../../public/icons/search.svg';
import styles from './TheSearch.module.scss';

export default function TheSearch({ goSearchIcon = GoSearch, className, searchIcon = Search, ...divProps }: Props) {
  const searchInput = useRef(null);

  const classNameComputed = `${styles.search} ${className === undefined ? '' : className}`;

  async function inputHandler(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  return (
    <search className={classNameComputed} role="search" {...divProps}>
      <Image className={styles['search__icon-magnifier']} src={searchIcon} alt='Иконка поиска' />
      <input className={styles.search__input} placeholder='Поиск' ref={searchInput} type="text" onChange={inputHandler} />
      <Image className={styles['search__icon-go']} src={goSearchIcon} alt='Найти' />
    </search>
  );
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  searchIcon?: string;
  goSearchIcon?: string;
}
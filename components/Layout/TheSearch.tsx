'use client';

import Image from 'next/image';
import { useRef, type FormEvent } from "react";
import GoSearch from '../../public/icons/go-search.svg';
import Search from '../../public/icons/search.svg';
import styles from './TheSearch.module.scss';

export default function TheSearch() {
  const searchInput = useRef(null);

  async function inputHandler(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  return (
    <search className={styles.search} role="search">
      <Image className={styles['search__icon-magnifier']} src={Search} alt='Иконка поиска' />
      <input className={styles.search__input} placeholder='Поиск' ref={searchInput} type="text" onChange={inputHandler} />
      <Image className={styles['search__icon-go']} src={GoSearch} alt='Найти' />
    </search>
  );
}

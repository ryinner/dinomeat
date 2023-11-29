'use client';

import { PropertyWithValues } from "@/@types/private";
import { FormEvent } from 'react';
import Filter from './Filter';
import styles from './TheFilters.module.scss';

export default function TheFilters({ properties }: Props) {
  const [first, ...all] = properties;

  function submitHandler (e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form className={styles.filters} onSubmit={submitHandler}>
      <ul className={styles.filters__list} >
        <li className={styles.filters__item}>
          <Filter heading={first.name}>
            Дети
          </Filter>
        </li>
        <li className={styles.filters__item}>
          <Filter heading='Цена'>
            Дети
          </Filter>
        </li>
        {all.map((p) => (
          <li className={styles.filters__item} key={p.id}>
            <Filter heading={p.name}>
              Дети
            </Filter>
          </li>
        ))}
      </ul>
    </form>
  );
}

interface Props {
  properties: PropertyWithValues[];
}

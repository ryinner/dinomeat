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
        <li>
          <Filter heading={first.name}>
            Дети
          </Filter>
        </li>
        <li>
          <Filter heading='Цена'>
            Дети
          </Filter>
        </li>
        {all.map((p) => (
          <li key={p.id}>
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

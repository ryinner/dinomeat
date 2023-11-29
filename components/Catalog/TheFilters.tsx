'use client';

import { PropertyWithValues } from "@/@types/private";
import { FormEvent } from 'react';
import Filter from './Filter';

export default function TheFilters({ properties }: Props) {
  const [first, ...all] = properties;

  function submitHandler (e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section>
      <form onSubmit={submitHandler}>
        <Filter heading={first.name}>
          Дети
        </Filter>
        <Filter heading='Цена'>
          Дети
        </Filter>
        {all.map((p) => (
          <Filter heading={p.name} key={p.id}>
            Дети
          </Filter>
        ))}
      </form>
    </section>
  );
}

interface Props {
  properties: PropertyWithValues[];
}

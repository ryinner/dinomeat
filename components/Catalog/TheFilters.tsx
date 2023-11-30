"use client";

import { PriceFilter, PropertyWithValues } from "@/@types/private";
import { getParam, getParamName, joinValues } from '@/services/lib/filters.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from "react";
import Filter from "./Filter";
import PriceFilterContent from './PriceFilterContent';
import PropertyFilterContent from "./PropertyFilterContent";
import styles from "./TheFilters.module.scss";

export default function TheFilters({ properties, price }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [first, ...all] = properties;

  function submitHandler(e: FormEvent) {
    e.preventDefault();
  }

  function onChangePropertyHandler({ id, valuesIds }: { id: number, valuesIds: number[]}) {
    const params = new URLSearchParams(searchParams);
    const name = getParamName(id);
    if (valuesIds.length > 0) {
      params.set(name, joinValues(valuesIds));
    } else {
      params.delete(name);
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form className={styles.filters} onSubmit={submitHandler}>
      <ul className={styles.filters__list}>
        <li className={styles.filters__item}>
          <Filter heading={first.name}>
            <PropertyFilterContent onChange={onChangePropertyHandler} property={first} initialValues={getParam(first.id, searchParams)} />
          </Filter>
        </li>
        <li className={styles.filters__item}>
          <Filter heading="Цена">
            <PriceFilterContent price={price} />
          </Filter>
        </li>
        {all.map((p) => (
          <li className={styles.filters__item} key={p.id}>
            <Filter heading={p.name}>
              <PropertyFilterContent onChange={onChangePropertyHandler}  property={p} initialValues={getParam(p.id, searchParams)} />
            </Filter>
          </li>
        ))}
      </ul>
    </form>
  );
}

interface Props {
  properties: PropertyWithValues[];
  price: PriceFilter;
}

'use client';

import type { PropertyWithValuesAndProducts } from '@/@types/private';
import { usePropsState } from '@/hooks/StateHooks';
import ProductsEditPropertiesItem from './ProductsEditPropertiesItem';

export default function ProductsEditProperties ({id, properties: initialProperties}: Props) {
  const [properties, setProperties] = usePropsState(initialProperties);

  return <fieldset>
      <legend>Характеристики</legend>
      {properties.map(p => <ProductsEditPropertiesItem key={p.id} id={id} property={p} />)}
    </fieldset>
}

interface Props {
  id: number;
  properties: PropertyWithValuesAndProducts[];
}
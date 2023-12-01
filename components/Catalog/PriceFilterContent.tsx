'use client';

import { PriceFilter } from '@/@types/private';
import { useSearchParams } from 'next/navigation';
import ControlsRangeSlider from '../Controls/ControlsRangeSlider';
import styles from './PriceFilterContent.module.scss';

export default function PriceFilterContent ({ price, onChange }: Props) {
  const searchParams = useSearchParams();

  const minValue = searchParams.get('price_min') === null ? price.min : Number(searchParams.get('price_min'));
  const maxValue = searchParams.get('price_max') === null ? price.max : Number(searchParams.get('price_max'));

  return <div className={styles.filter}>
    <ControlsRangeSlider onChange={onChange} {...price} minValue={minValue} maxValue={maxValue} />
  </div>
}

interface Props  {
  price: PriceFilter;
  onChange: (e: { min: number; max: number; }) => void;
}
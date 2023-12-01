import { PriceFilter } from '@/@types/private';
import ControlsRangeSlider from '../Controls/ControlsRangeSlider';
import styles from './PriceFilterContent.module.scss';

export default function PriceFilterContent ({ price, onChange }: Props) {
  return <div className={styles.filter}>
    <ControlsRangeSlider onChange={onChange} {...price} />
  </div>
}

interface Props  {
  price: PriceFilter;
  onChange: (e: { min: number; max: number; }) => void;
}
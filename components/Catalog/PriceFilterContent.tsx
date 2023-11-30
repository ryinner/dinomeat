import { PriceFilter } from '@/@types/private';
import ControlsRangeSlider from '../Controls/ControlsRangeSlider';

export default function PriceFilterContent ({ price }: Props) {

  return <div>
    <ControlsRangeSlider {...price} />
  </div>
}

interface Props  {
  price: PriceFilter;
}
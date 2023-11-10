"use client";

import { PropertyWithValuesAndProducts } from "@/@types/private";
import ControlsSelect from "@/components/Controls/ControlsSelect";

export default function ProductsEditPropertiesItem({ id, property }: Props) {
  const selectedValue = property.products.find(p => p.valueId)?.valueId;

  return (
    <label>
      {property.name}:
      <ControlsSelect empty='Выберите характеристику'>
        {property.values.map((v) => (
          <option key={v.id} selected={selectedValue === v.id}>{v.value}</option>
        ))}
      </ControlsSelect>
    </label>
  );
}

interface Props {
  id: number;
  property: PropertyWithValuesAndProducts;
}

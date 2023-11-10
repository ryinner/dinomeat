"use client";

import { PropertyWithValuesAndProducts } from "@/@types/private";
import ControlsSelect from "@/components/Controls/ControlsSelect";
import type { FormEvent } from "react";

export default function ProductsEditPropertiesItem({
  property,
  onUpdate,
}: Props) {
  const selectedValue = property.products.find((p) => p.valueId)?.valueId;

  function selectHandler(e: FormEvent<HTMLSelectElement>) {
    if (e.target instanceof HTMLSelectElement) {
      const { value } = e.target;
      onUpdate(property, value)
    }
  }

  return (
    <label>
      {property.name}:
      <ControlsSelect value={selectedValue} onChange={selectHandler} empty="Выберите характеристику">
        {property.values.map((v) => (
          <option key={v.id} value={v.id}>
            {v.value}
          </option>
        ))}
      </ControlsSelect>
    </label>
  );
}

interface Props {
  property: PropertyWithValuesAndProducts;
  onUpdate: (property: PropertyWithValuesAndProducts, value?: string) => void;
}

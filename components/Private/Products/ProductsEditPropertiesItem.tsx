"use client";

import { PropertyWithValuesAndProducts } from "@/@types/private";
import ControlsSelect from "@/components/Controls/ControlsSelect";
import { frontRequest } from "@/services/api/api.service";
import type { FormEvent } from "react";

export default function ProductsEditPropertiesItem({
  id,
  property,
  onUpdate,
}: Props) {
  const selectedValue = property.products.find((p) => p.valueId)?.valueId;

  function selectHandler(e: FormEvent<HTMLSelectElement>) {
    if (e.target instanceof HTMLSelectElement) {
      const { value } = e.target;
      frontRequest<{ property: PropertyWithValuesAndProducts }>(
        `/api/admin/products/${id}/properties/${property.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ value }),
        },
        { withMessage: true }
      ).then((res) => {
        onUpdate(res.property);
      });
    }
  }

  return (
    <label>
      {property.name}:
      <ControlsSelect empty="Выберите характеристику">
        {property.values.map((v) => (
          <option key={v.id} selected={selectedValue === v.id}>
            {v.value}
          </option>
        ))}
      </ControlsSelect>
    </label>
  );
}

interface Props {
  id: number;
  property: PropertyWithValuesAndProducts;
  onUpdate: (property: PropertyWithValuesAndProducts) => void;
}

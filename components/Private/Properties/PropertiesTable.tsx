'use client';

import { PropertyWithValues } from "@/@types/private";
import AddIcon from '@/components/Icons/AddIcon';
import { useState } from 'react';
import PropertyTr from "./PropertyTr";

export default function PropertiesTable({ properties: initialProperties }: Props) {
  const [properties, setProperties] = useState(initialProperties);

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>Id</th>
          <th style={{ width: "30%" }}>Наименование</th>
          <th style={{ width: "60%" }}>Значения</th>
          <th style={{ width: "5%" }}>
            <AddIcon />
          </th>
        </tr>
      </thead>
      <tbody>
        {properties.map((p) => (
          <PropertyTr key={p.id} property={p} />
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  properties: PropertyWithValues[];
}

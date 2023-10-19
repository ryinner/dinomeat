"use client";

import { PropertyWithValues } from "@/@types/private";
import EditIcon from "@/components/Icons/EditIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { request } from '@/services/api/api.service';
import { Value } from '@prisma/client';
import { FormEvent, useState } from "react";
import ValuePin from '../Values/ValuePin';

export default function PropertyTr({ property, onUpdate }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(property.name);

  const editHandle = () => {
    setIsEdit(true);
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  };

  const saveHandler = () => {
    request(`/api/properties/${property.id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    }).then(() => {
      setIsEdit(false);
      onUpdate({ ...property, name });
    });
  };

  const saveValueHandler = (e: Value) => {
    onUpdate({ ...property, values: property.values.map(v => {
      return v.id === e.id ? e : v;
    })});
  }

  const removeValueHandler = (e: Value) => {

  }

  return (
    <tr>
      <td>{property.id}</td>
      <td>{!isEdit ? property.name : <input value={name} onInput={inputHandler} />}</td>
      <td>
        {property.values.map((v) => (
          <ValuePin key={v.id} value={v} onUpdate={saveValueHandler} onRemove={removeValueHandler} />
        ))}
      </td>
      <td>{!isEdit ? <EditIcon onClick={editHandle} /> : <SaveIcon onClick={saveHandler} />}</td>
    </tr>
  );
}

interface Props {
  property: PropertyWithValues;
  onUpdate: (e: PropertyWithValues) => void;
}

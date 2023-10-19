"use client";

import { PropertyWithValues } from "@/@types/private";
import EditIcon from "@/components/Icons/EditIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { request } from '@/services/api/api.service';
import { FormEvent, useState } from "react";

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

  return (
    <tr>
      <td>{property.id}</td>
      <td>{!isEdit ? property.name : <input value={name} onInput={inputHandler} />}</td>
      <td>
        {property.values.map((v) => (
          <span key={v.id}>{v.value}</span>
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

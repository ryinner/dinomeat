"use client";

import { PropertyWithValues } from "@/@types/private";
import Button from '@/components/Button/Button';
import AddIcon from "@/components/Icons/AddIcon";
import EditIcon from "@/components/Icons/EditIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { frontRequest, request } from "@/services/api/api.service";
import { Value } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import ValuePin from "../Values/ValuePin";

export default function PropertyTr({ property, onUpdate }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(property.name);
  const [newValueName, setNewValueName] = useState<string | null>(null);

  const editHandle = () => {
    setIsEdit(true);
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  };

  const saveHandler = (body: object) => {
    frontRequest<{property: PropertyWithValues}>(`/api/admin/properties/${property.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, { withMessage: true }).then((response) => {
      setIsEdit(false);
      onUpdate(response.property);
    });
  };

  const saveValueHandler = (e: Value) => {
    onUpdate({
      ...property,
      values: property.values.map((v) => {
        return v.id === e.id ? e : v;
      }),
    });
  };

  const removeValueHandler = (e: Value) => {
    onUpdate({
      ...property,
      values: property.values.filter((v) => {
        return v.id !== e.id;
      }),
    });
  };

  const addNewValueHandler = (e: Value) => {
    setNewValueName("");
  };

  const inputNewValueNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValueName(e.target.value);
  };

  const saveNewValueHandler = () => {
    request<{property: PropertyWithValues}>(`/api/admin/properties/${property.id}`, {
      method: "PUT",
      body: JSON.stringify({ values: { create: [{ value: newValueName }] } }),
    }).then((response) => {
      setNewValueName(null);
      onUpdate(response.property);
    });
  }

  return (
    <tr>
      <td>{property.id}</td>
      <td>
        {!isEdit ? (
          property.name
        ) : (
          <input value={name} onInput={inputHandler} />
        )}
      </td>
      <td>
        {property.values.map((v) => (
          <ValuePin
            key={v.id}
            value={v}
            onUpdate={saveValueHandler}
            onRemove={removeValueHandler}
          />
        ))}
        {newValueName === null ? (
          <AddIcon onClick={addNewValueHandler} />
        ) : (
          <>
            <input value={newValueName} onInput={inputNewValueNameHandler} /> <SaveIcon onClick={saveNewValueHandler} />
          </>
        )}
      </td>
      <td>
        <Button onClick={() => { saveHandler({ isFilter: !property.isFilter }) }}>
          { property.isFilter ? 'Убрать' : 'Добавить' }
        </Button>
      </td>
      <td>
        {!isEdit ? (
          <EditIcon onClick={editHandle} />
        ) : (
          <SaveIcon onClick={() => { saveHandler({ name }) }} />
        )}
      </td>
    </tr>
  );
}

interface Props {
  property: PropertyWithValues;
  onUpdate: (e: PropertyWithValues) => void;
}

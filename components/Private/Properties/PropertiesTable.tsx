"use client";

import { PropertyWithValues } from "@/@types/private";
import AddIcon from "@/components/Icons/AddIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { usePropsState } from '@/hooks/StateHooks';
import { frontRequest } from '@/services/api/api.service';
import { FormEvent, useState } from "react";
import PropertyTr from "./PropertyTr";

export default function PropertiesTable({
  properties: initialProperties,
}: Props) {
  const [properties, setProperties] = usePropsState(initialProperties);
  const [newPropertyName, setNewPropertyName] = useState<null | string>(null);

  const addHandler = () => {
    if (newPropertyName === null) {
      setNewPropertyName("");
    }
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setNewPropertyName(e.target.value);
    }
  };

  const saveHandler = () => {
    frontRequest<{ property: PropertyWithValues }>("/api/admin/properties", {
      method: "POST",
      body: JSON.stringify({ name: newPropertyName }),
    }, { withMessage: true }).then((res) => {
      setProperties([res.property, ...properties]);
      setNewPropertyName(null);
    });
  };

  const updateHandler = (e: PropertyWithValues) => {
    setProperties(() =>
      properties.map((p) => {
        return p.id === e.id ? e : p;
      })
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>Id</th>
          <th style={{ width: "30%" }}>Наименование</th>
          <th style={{ width: "60%" }}>Значения</th>
          <th style={{ width: "5%" }}>
            {newPropertyName === null ? (
              <AddIcon onClick={addHandler} />
            ) : (
              <>
                <input value={newPropertyName} onInput={inputHandler}/>
                <SaveIcon onClick={saveHandler} />
              </>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {properties.map((p) => (
          <PropertyTr key={p.id} property={p} onUpdate={updateHandler} />
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  properties: PropertyWithValues[];
}

'use client';

import { request } from '@/services/api/api.service';
import { Category } from "@prisma/client";
import { FormEvent, useState } from "react";
import EditIcon from "../Icons/EditIcon";
import SaveIcon from '../Icons/SaveIcon';

export default function CategoryTr({ category, onUpdate }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(category.name);

  const setEdit = () => {
    setIsEdit(true);
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  }

  const saveHandler = () => {
    const categoryDto = { ...category, name };
    request(`/api/categories/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryDto)
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        setIsEdit(false);
        onUpdate(categoryDto);
      }
    });
  };

  return (
    <tr>
      <td>{category.id}</td>
      <td>{!isEdit ? category.name : <input value={name} onInput={inputHandler} />}</td>
      <td>
        { !isEdit ? <EditIcon onClick={setEdit} /> : <SaveIcon onClick={saveHandler} /> }
      </td>
    </tr>
  );
}

interface Props {
  category: Category;
  onUpdate: (e: Category) => void;
}

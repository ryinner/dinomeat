'use client';

import { request } from '@/services/api/api.service';
import { Category } from "@prisma/client";
import { FormEvent, useState } from "react";
import Button from '../Button/Button';
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
    request(`/api/categories/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name })
    }).then(() => {
      setIsEdit(false);
      onUpdate({ ...category, name });
    });
  };

  const publishHandler = () => {
    request(`/api/categories/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify({ published: true })
    }).then(() => {
      setIsEdit(false);
      onUpdate({ ...category, published: true });
    });
  }

  return (
    <tr>
      <td>{category.id}</td>
      <td>
        {!isEdit ? category.name : <input value={name} onInput={inputHandler} />}
      </td>
      <td>
      {!category.published && <Button onClick={publishHandler}>Опубликовать</Button>}
      </td>
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

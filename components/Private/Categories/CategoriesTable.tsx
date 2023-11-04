"use client";

import { usePropsState } from '@/hooks/StateHooks';
import { frontRequest } from "@/services/api/api.service";
import { Category } from "@prisma/client";
import { FormEvent, useState } from "react";
import AddIcon from "../../Icons/AddIcon";
import SaveIcon from "../../Icons/SaveIcon";
import CategoryTr from "./CategoryTr";

export default function CategoriesTable({
  categories: initialCategories,
}: Props) {
  const [categories, setCategories] = usePropsState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState<null | string>(null);

  const updateHandler = (e: Category) => {
    setCategories(() =>
      categories.map((c) => {
        return c.id === e.id ? e : c;
      })
    );
  };

  const addHandler = () => {
    if (newCategoryName === null) {
      setNewCategoryName("");
    }
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setNewCategoryName(e.target.value);
    }
  };

  const saveHandler = () => {
    frontRequest<{ category: Category }>("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name: newCategoryName }),
    }, { withMessage: true }).then((res) => {
      setCategories([res.category, ...categories]);
      setNewCategoryName(null);
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>id</th>
          <th style={{ width: "75%" }}>Наименование</th>
          <th style={{ width: "10%" }}>Публикация</th>
          <th style={{ width: "10%" }}>
            {newCategoryName === null ? (
              <AddIcon onClick={addHandler} title="Добавить категорию" />
            ) : (
              <>
                <input value={newCategoryName} onInput={inputHandler} />
                <SaveIcon onClick={saveHandler} />
              </>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryTr
            key={category.id}
            category={category}
            onUpdate={updateHandler}
          />
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  categories: Category[];
}

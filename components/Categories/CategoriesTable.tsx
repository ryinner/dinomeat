'use client';

import { Category } from "@prisma/client";
import { useState } from "react";
import CategoryTr from "./CategoryTr";

export default function CategoriesTable({
  categories: initialCategories,
}: Props) {
  const [categories, updateCategories] = useState(initialCategories);

  const updateHandler = (e: Category) => {
    updateCategories(() =>
      categories.map((c) => {
        return c.id === e.id ? e : c;
      })
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>id</th>
          <th style={{ width: "85%" }}>Наименование</th>
          <th style={{ width: "10%" }} />
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

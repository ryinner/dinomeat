import { Category } from "@prisma/client";
import { useReducer } from 'react';

export type CategoriesReducerActions = "added" | "updated";

export function CategoriesProvider (initialCategories: Category[]) {
  const [categories, dispatch] = useReducer(categoriesReducer, initialCategories);
  
}

function categoriesReducer(
  categories: Category[],
  action: {
    category: Partial<Category>;
    type: CategoriesReducerActions;
  }
): Category[] {
  switch (action.type) {
    case "added":
      return [
        ...categories,
        {
          ...action.category as Category,
        },
      ];
    case "updated": {
      return categories.map((category) => {
        if (category.id === action.category.id) {
          return action.category as Category;
        } else {
          return category;
        }
      });
    }
    default:
      throw new Error("Unknown action in categories reducer");
  }
}

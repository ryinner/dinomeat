'use client';
// 
import { request } from "@/services/api/api.service";
import { Category } from "@prisma/client";
import React, {
  createContext,
  useEffect,
  useRef,
  useState
} from "react";

export const TheNavigationCategoriesContext = createContext<Pick<Category, 'id' | 'name'>[]>([]);

export default function TheNavigationCategoriesProvider({ children }: Props) {
  const [categories, setCategories] = useState<Pick<Category, 'id' | 'name'>[]>([]);
  const hasBeenRequested = useRef(false);

  useEffect(() => {
    if (!hasBeenRequested.current) {
      hasBeenRequested.current = true;
      request<{ categories: Category[] }>("/api/categories", {
        next: {
          revalidate: 600,
        },
      }).then((res) => {
        setCategories(res.categories);
      });
    }
  }, []);

  return (
    <TheNavigationCategoriesContext.Provider value={categories}>
      {children}
    </TheNavigationCategoriesContext.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}

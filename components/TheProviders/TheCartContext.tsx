"use client";

import { useLocalStorageState } from "@/hooks/StateHooks";
import React, { createContext, useContext } from "react";

export const TheCartContext = createContext<{
  cart: CartItem[];
  addToCart: (payload: number) => void;
  removeFromCart: (payload: number) => void;
  updateCart: (payload: number, amount: number) => void;
  isInCart: (payload: number) => boolean;
  findInCart: (payload: number) => CartItem | undefined;
  cleanCart: () => void;
}>({
  cart: [],
  addToCart: () => { },
  updateCart: () => { },
  removeFromCart: () => { },
  isInCart: () => false,
  findInCart: () => undefined,
  cleanCart: () => undefined
});

export default function TheCartProvider({ children }: Props) {
  const [cart, setCart] = useLocalStorageState<CartItem[]>([], "cart");

  function addToCart(payload: number) {
    const item = findInCart(payload);
    if (item) {
      updateCart(payload, 1);
    } else {
      setCart((cart) => [...cart, { id: payload, amount: 1 }]);
    }
  }

  function updateCart(payload: number, amount: number) {
    const item = findInCart(payload);
    if (!item) {
      throw new Error("Item not found");
    }
    item.amount += amount;
    if (item.amount <= 0) {
      removeFromCart(payload);
      return;
    }
    setCart((cart) => cart.map((c) => (c.id === payload ? item : c)));
  }

  function removeFromCart(payload: number) {
    setCart((state) => state.filter((item) => item.id !== payload));
  }

  function findInCart(payload: number) {
    return cart.find((item) => item.id === payload);
  }

  function isInCart(payload: number) {
    return Boolean(findInCart(payload));
  }

  function cleanCart () {
    setCart([]);
  }

  return (
    <TheCartContext.Provider
      value={{ cart, addToCart, updateCart, removeFromCart, isInCart, findInCart, cleanCart }}
    >
      {children}
    </TheCartContext.Provider>
  );
}

export function useCart() {
  return useContext(TheCartContext);
}

export interface CartItem {
  id: number;
  amount: number;
}

interface Props {
  children: React.ReactNode;
}

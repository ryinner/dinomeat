"use client";

import { useClickOutside } from "@/hooks/DomHooks";
import { useLocalStorageState } from "@/hooks/StateHooks";
import { frontRequest } from "@/services/api/api.service";
import { Product } from "@prisma/client";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import GoSearch from "../../public/icons/go-search.svg";
import Search from "../../public/icons/search.svg";
import X from "../../public/icons/x.svg";
import CatalogProductLink from "../Links/CatalogProductLink";
import styles from "./TheSearch.module.scss";

const initialHistory: Product[] = [];

export default function TheSearch({
  goSearchIcon = GoSearch,
  className,
  searchIcon = Search,
  ...divProps
}: Props) {
  const searchInput = useRef<HTMLInputElement>(null);
  const searchAbortController = useRef<AbortController>();
  const [isFocus, setIsFocus] = useState(false);
  const [searchList, setSearchList] = useState<Product[]>([]);
  const [history, setHistory] = useLocalStorageState<Product[]>(
    initialHistory,
    "search-history"
  );

  const searchField = useClickOutside<HTMLElement>(() => {
    setIsFocus(false);
  });

  const classNameComputed = `${styles.search} ${
    className === undefined ? "" : className
  }`;

  const showHistory = history.length > 0 && searchList.length === 0 && searchInput.current?.value === '';
  const isOpen = isFocus && (history.length > 0 || searchList.length > 0);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;
    if (value.trim() === "") {
      setSearchList([]);
    } else {
      if (searchAbortController.current !== undefined) {
        searchAbortController.current.abort();
      }
      searchAbortController.current = new AbortController();
      frontRequest<{ products: Product[] }>(`/api/products?query=${value}`, {
        method: "GET",
        signal: searchAbortController.current.signal,
      }, {}).then((res) => { setSearchList(res.products); });
    }
  }

  function focusHandler() {
    setIsFocus(true);
  }

  function removeFromHistoryHandler(id: number) {
    setHistory((history) => history.filter((h) => h.id !== id));
  }

  function addToHistoryHandler(product: Product) {
    const historyWithoutProduct = history.filter((h) => h.id !== product.id);
    if (historyWithoutProduct.length > 5) {
      historyWithoutProduct.splice(5, historyWithoutProduct.length - 5);
    }

    setHistory([
      product,
      ...historyWithoutProduct
    ]);

    setSearchList([]);
    setIsFocus(false);

    if (searchInput.current) {
      searchInput.current.value = '';
    }
  }

  return (
    <search
      className={classNameComputed}
      role="search"
      ref={searchField}
      {...divProps}
    >
      <Image
        className={styles["search__icon-magnifier"]}
        src={searchIcon}
        alt="Иконка поиска"
      />
      <input
        className={`${styles.search__input} ${isOpen && styles['search__input--with-list']}`}
        placeholder="Поиск"
        type="text"
        inputMode='search'
        onChange={changeHandler}
        onFocus={focusHandler}
        ref={searchInput}
      />
      <Image
        className={styles["search__icon-go"]}
        src={goSearchIcon}
        alt="Найти"
      />
      {isOpen && (
        <ul
          className={`${styles.search__list} ${
            showHistory
              ? styles["search__list--row"]
              : styles["search__list--column"]
          }`}
        >
          {showHistory ?
            history.map((h) => (
              <li className={styles['search__history-item']} key={h.id}>
                <CatalogProductLink product={h} />
                <Image
                  src={X}
                  alt="Удалить из истории поиска"
                  className={styles["search__remove-icon"]}
                  onClick={() => {
                    removeFromHistoryHandler(h.id);
                  }}
                />
              </li>
            )) : (
              searchList.map(s => (
                <li key={s.id} className={styles.search__item}>
                  <CatalogProductLink product={s} onClick={() => { addToHistoryHandler(s); }} />
                </li>
              ))
            )
          }
        </ul>
      )}
    </search>
  );
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  searchIcon?: string;
  goSearchIcon?: string;
}

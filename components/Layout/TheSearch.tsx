"use client";

import { useClickOutside } from "@/hooks/DomHooks";
import { useLocalStorageState } from "@/hooks/StateHooks";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import GoSearch from "../../public/icons/go-search.svg";
import Search from "../../public/icons/search.svg";
import X from "../../public/icons/x.svg";
import CatalogProductLink from "../Links/CatalogProductLink";
import styles from "./TheSearch.module.scss";

const pseudoResult = [
  {
    id: 1,
    name: "Нашелся",
  },
];

const pseudoHistory = [
  {
    id: 2,
    name: "Историческая штука",
    slug: "test",
  },
  {
    id: 3,
    name: "Историческая 2",
    slug: "test",
  },
  {
    id: 4,
    name: "Историческая штука 3",
    slug: "test",
  },
];

export default function TheSearch({
  goSearchIcon = GoSearch,
  className,
  searchIcon = Search,
  ...divProps
}: Props) {
  const searchInput = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [history, setHistory] = useLocalStorageState(
    pseudoHistory,
    "search-history"
  );

  const searchField = useClickOutside<HTMLElement>(() => {
    setIsFocus(false);
  });

  const classNameComputed = `${styles.search} ${
    className === undefined ? "" : className
  }`;

  const showHistory = history.length > 0;

  async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  async function focusHandler() {
    setIsFocus(true);
  }

  async function removeFromHistoryHandler(id: number) {
    setHistory((history) => history.filter((h) => h.id !== id));
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
        className={styles.search__input}
        placeholder="Поиск"
        ref={searchInput}
        type="text"
        onChange={changeHandler}
        onFocus={focusHandler}
      />
      <Image
        className={styles["search__icon-go"]}
        src={goSearchIcon}
        alt="Найти"
      />
      {isFocus && (
        <ul
          className={`${styles.search__list} ${
            showHistory
              ? styles["search__list--row"]
              : styles["search__list--column"]
          }`}
        >
          {showHistory &&
            history.map((h) => (
              <li className={styles.search__item} key={h.id}>
                <CatalogProductLink product={h} />{" "}
                <Image
                  src={X}
                  alt="Удалить из истории поиска"
                  className={styles["search__remove-icon"]}
                  onClick={() => { removeFromHistoryHandler(h.id); }}
                />
              </li>
            ))}
        </ul>
      )}
    </search>
  );
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  searchIcon?: string;
  goSearchIcon?: string;
}

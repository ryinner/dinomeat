"use client";

import { useClickOutside } from "@/hooks/DomHooks";
import { navigationLinksMap } from "@/shared/maps/navigation.map";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import Burger from "../../public/icons/burger.svg";
import GoSearchWhite from "../../public/icons/go-search-white.svg";
import SearchWhite from "../../public/icons/search-white.svg";
import CatalogCategoryLink from "../Links/CatalogCategoryLink";
import { TheNavigationCategoriesContext } from "../TheProviders/TheNavigationCategoriesContext";
import styles from "./TheBurgerMenu.module.scss";
import TheSearch from "./TheSearch";

const variants = {
  open: {
    x: 0,
  },
  closed: {
    x: -750,
  },
};

export default function TheBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useContext(TheNavigationCategoriesContext);

  const { status } = useSession();

  const sidebar = useClickOutside<HTMLElement>(() => {
    hideHandler();
  });

  function openHandler() {
    setIsOpen(true);
  }

  function hideHandler() {
    setIsOpen(false);
  }

  return (
    <div className={styles["burger-menu"]}>
      <Image
        src={Burger}
        height={22}
        alt="Открыть навигацию"
        className={styles["burger-menu__icon"]}
        onClick={openHandler}
      />
      <motion.aside
        initial={"closed"}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{
          duration: 0.3,
        }}
        className={styles["burger-menu__sidebar"]}
        ref={sidebar}
      >
        <nav>
          <ul className={styles["burger-menu__list"]}>
            <li
              className={`${styles["burger-menu__header"]} ${styles["burger-menu__item"]}`}
            >
              <Image
                src={Burger}
                height={22}
                alt="Закрыть навигацию"
                className={`${styles["burger-menu__icon"]} ${styles["burger-menu__icon--active"]}`}
                onClick={hideHandler}
              />
              <TheSearch
                className={styles["burger-menu__search"]}
                searchIcon={SearchWhite}
                goSearchIcon={GoSearchWhite}
              />
            </li>
            {categories.map((c) => (
              <li key={c.id} className={styles["burger-menu__item"]}>
                <CatalogCategoryLink onClick={hideHandler} category={c} />
              </li>
            ))}
            {navigationLinksMap.map((l) => (
              <li key={l.label} className={`${styles["burger-menu__link"]} only-mobile`}>
                {"link" in l ? (
                  <Link href={l.link}>
                    <span onClick={hideHandler}>{l.label}</span>
                  </Link>
                ) : (
                  (status === "authenticated" && (
                    <Link href={l.link_profile}>
                      <span onClick={hideHandler}>{l.label}</span>
                    </Link>
                  )) ||
                  (status === "unauthenticated" && (
                    <Link href={l.link_auth}>
                      <span onClick={hideHandler}>{l.label}</span>
                    </Link>
                  ))
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </div>
  );
}

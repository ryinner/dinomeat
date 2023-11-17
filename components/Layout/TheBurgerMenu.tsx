"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useState } from "react";
import Burger from "../../public/icons/burger.svg";
import CatalogCategoryLink from "../Links/CatalogCategoryLink";
import { TheNavigationCategoriesContext } from "../TheProviders/TheNavigationCategoriesContext";
import styles from "./TheBurgerMenu.module.scss";
import TheSearch from './TheSearch';

const variants = {
  open: {
    x: 0,
  },
  closed: {
    x: -500,
  },
};

export default function TheBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useContext(TheNavigationCategoriesContext);

  function toggleHandler() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={styles["burger-menu"]}>
      <Image
        src={Burger}
        height={22}
        alt="Открыть навигацию"
        className={styles["burger-menu__icon"]}
        onClick={toggleHandler}
      />
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{
          duration: 0.3,
        }}
        className={styles["burger-menu__sidebar"]}
      >
        <div className={styles["burger-menu__header"]}>
          <Image
            src={Burger}
            height={22}
            alt="Открыть навигацию"
            className={`${styles["burger-menu__icon"]} ${styles["burger-menu__icon--active"]}`}
            onClick={toggleHandler}
          />
          <TheSearch className={styles["burger-menu__search"]} />
        </div>
        <nav>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <CatalogCategoryLink category={c} />
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </div>
  );
}

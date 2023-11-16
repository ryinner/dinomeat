"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import Burger from "../../public/icons/burger.svg";
import CatalogCategoryLink from "../Links/CatalogCategoryLink";
import { TheNavigationCategoriesContext } from "../TheProviders/TheNavigationCategoriesContext";
import styles from "./TheBurgerMenu.module.scss";

export default function TheBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useContext(TheNavigationCategoriesContext);

  function toggleHandler () {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={styles["burger-menu"]}>
      <Image
        src={Burger}
        height={22}
        alt="Открыть навигацию"
        className={styles["burger-menu-icon"]}
        onClick={toggleHandler}
      />
      {isOpen && (
        <div className={styles["burger-menu__sidebar"]}>
          <nav>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <CatalogCategoryLink category={c} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

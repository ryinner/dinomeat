"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import CatalogCategoryLink from '../Links/CatalogCategoryLink';
import { TheNavigationCategoriesContext } from "../TheProviders/TheNavigationCategoriesContext";
import styles from './TheCategoriesNavigation.module.scss';

export default function TheCategoriesNavigation() {
  const pathname = usePathname();
  const isMain = pathname === "/";
  const categories = useContext(TheNavigationCategoriesContext);

  return (
    <>
      {!isMain && (
        <nav className={styles['categories-nav']}>
          <ul className={styles['categories-nav__list']}>
            {categories.map((c) => (
              <li className={styles['categories-nav__item']} key={c.id}>
                <CatalogCategoryLink category={c} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

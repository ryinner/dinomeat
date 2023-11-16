"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
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
                <Link href={`/catalog?category_id=${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

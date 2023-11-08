'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import styles from './TheNavigation.module.scss';

const navigationLinks = [
  {
    label: "Профиль",
    link: "/profile",
  },
  {
    label: "Корзина",
    link: "/shop",
  },
  {
    label: "Каталог",
    link: "/catalog",
  },
  {
    label: "Доставка",
    link: "/delivery",
  },
  {
    label: "Контакты",
    link: "/contacts",
  },
];

export function TheNavigation() {
  const pathname = usePathname();
  const isMain = pathname === '/';

  return (
    <nav className={styles.nav}>
      <ul>
        {navigationLinks.map((link) => (
          <li className={`${styles.nav__link} ${pathname === link.label && styles['nav__link--active']}`} key={link.label}>
            <Link href={link.link}>{link.label}</Link> {link.icon}
          </li>
        ))}
      </ul>
    </nav>
  );
}

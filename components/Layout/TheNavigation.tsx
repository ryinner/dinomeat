'use client';

import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Book from '../../public/icons/book.svg';
import Cart from '../../public/icons/cart.svg';
import Delivery from '../../public/icons/delivery.svg';
import PaperPlane from '../../public/icons/paper-plane.svg';
import User from '../../public/icons/user.svg';
import styles from './TheNavigation.module.scss';

const navigationLinks = [
  {
    label: "Профиль",
    link: "/profile",
    icon: User
  },
  {
    label: "Корзина",
    link: "/cart",
    icon: Cart
  },
  {
    label: "Каталог",
    link: "/shop",
    icon: Book
  },
  {
    label: "Доставка",
    link: "/delivery",
    icon: Delivery
  },
  {
    label: "Контакты",
    link: "/contacts",
    icon: PaperPlane
  },
];

export function TheNavigation() {
  const pathname = usePathname();
  const isMain = pathname === '/';

  return (
    <nav className={styles.nav}>
      <ul className={styles['nav__list']}>
        {navigationLinks.map((link) => (
          <li className={styles.nav__item} key={link.label}>
            <Link className={`${styles.nav__link} ${pathname === link.label && styles['nav__link--active']}`} href={link.link}>
              <Image src={link.icon} width={15} height={15} alt={link.label} />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

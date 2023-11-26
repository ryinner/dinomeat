import Image from 'next/image';
import Link from "next/link";
import Book from '../../public/icons/book.svg';
import Cart from '../../public/icons/cart.svg';
import Delivery from '../../public/icons/delivery.svg';
import MapPin from '../../public/icons/map-pin.svg';
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
    link: "/catalog",
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
    icon: MapPin
  },
];

export function TheNavigation({ className }: Props) {
  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles['nav__list']}>
        {navigationLinks.map((link) => (
          <li className={styles.nav__item} key={link.label}>
            <Link className={styles.nav__link} href={link.link}>
              <Image src={link.icon} height={15} alt={link.label} />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface Props {
  className?: string;
}
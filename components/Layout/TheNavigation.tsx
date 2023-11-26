import { navigationLinksMap } from '@/shared/maps/navigation.map';
import Image from 'next/image';
import Link from "next/link";
import styles from './TheNavigation.module.scss';

export function TheNavigation({ className }: Props) {
  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles['nav__list']}>
        {navigationLinksMap.map((link) => (
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
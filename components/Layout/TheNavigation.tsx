import { navigationLinksMap } from '@/shared/maps/navigation.map';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from "next/link";
import styles from './TheNavigation.module.scss';

export async function TheNavigation({ className }: Props) {
  const session = await getServerSession()

  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles['nav__list']}>
        {navigationLinksMap.map((link) => (
          <li className={styles.nav__item} key={link.label}>
            {
              'link' in link ?
              <Link className={styles.nav__link} href={link.link}>
                <Image src={link.icon} height={15} alt={link.label} />
                <span>{link.label}</span>
              </Link>
              : <Link className={styles.nav__link} href={!session ? link.link_auth : link.link_profile}>
                <Image src={link.icon} height={15} alt={link.label} />
                <span>{link.label}</span>
              </Link>
            }
            
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface Props {
  className?: string;
}
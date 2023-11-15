import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/icons/logo.svg';
import styles from './TheLogo.module.scss';

export default function TheLogo() {
  return (
    <Link href="/" className={styles.logo}>
      <Image src={Logo} alt="Логотип сайта: Динозавр Dinomeät" /> <span>Dinomeät</span>
    </Link>
  );
}

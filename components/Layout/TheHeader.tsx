import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/icons/logo.svg';
import TheBurgerMenu from './TheBurgerMenu';
import style from './TheHeader.module.scss';
import { TheNavigation } from './TheNavigation';
import TheSearch from './TheSearch';

export default function TheHeader() {
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <TheBurgerMenu />
        <TheNavigation />
        <Link href='/'>
          <Image src={Logo} alt='Логотип сайта: Динозавр Dinomeät' />
        </Link>
        <TheSearch />
      </div>
    </header>
  );
}

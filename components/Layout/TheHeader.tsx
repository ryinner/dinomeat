import TheBurgerMenu from './TheBurgerMenu';
import style from './TheHeader.module.scss';
import TheLogo from './TheLogo';
import { TheNavigation } from './TheNavigation';
import TheSearch from './TheSearch';

export default function TheHeader() {
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <TheBurgerMenu />
        <TheNavigation />
        <TheLogo />
        <TheSearch />
      </div>
    </header>
  );
}

import TheBurgerMenu from './TheBurgerMenu';
import styles from './TheHeader.module.scss';
import TheLogo from './TheLogo';
import { TheNavigation } from './TheNavigation';
import TheSearch from './TheSearch';

export default function TheHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <TheBurgerMenu />
        <TheNavigation className='not-mobile' />
        <TheLogo />
        <TheSearch className='not-mobile' />
        <div className='only-mobile clearfix' />
      </div>
    </header>
  );
}

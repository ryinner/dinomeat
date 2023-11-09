import style from './TheHeader.module.scss';
import { TheNavigation } from './TheNavigation';

export default function TheHeader() {
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <TheNavigation />
      </div>
    </header>
  );
}

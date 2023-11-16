import Image from 'next/image';
import AlphaBank from '../../public/layout/alpha-bank.png';
import styles from './TheFooter.module.scss';

export default function TheFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__images}>
          <Image src={AlphaBank} alt='Логотип альфа банка' />
        </div>
        <div className={styles['footer__company-info']}>
          <p>Официальный интернет-магазин «Dinomeät»</p>
          <p>ООО «ODL»</p>
          <p> ИНН: 7453355413</p>
          <p>КПП: 74530100</p>
          <p>ОГРН: 1237400034530</p>
          <p>454080 обл. Челябинская, г. Челябинск, ул. Энтузиастов, д. 12, офис 207 Телефон: +7 (922) 740-14-23</p>
        </div>
      </div>
    </footer>
  );
}

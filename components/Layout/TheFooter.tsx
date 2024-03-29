import Image from 'next/image';
import Link from 'next/link';
import AlphaBankMobile from '../../public/layout/alpha-bank-mobile.png';
import AlphaBank from '../../public/layout/alpha-bank.png';
import VkMobile from '../../public/layout/vk-mobile.png';
import styles from './TheFooter.module.scss';

export default function TheFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__images}>
          <Image src={AlphaBank} alt='Логотип альфа банка' className='not-mobile' />
          <Image src={AlphaBankMobile} alt='Логотип альфа банка' className='only-mobile' />
          <Link href='https://vk.com/dinomeat'><Image src={VkMobile} alt='Группа Вконтакте' className='only-mobile' /></Link>
        </div>
        <div className={styles['footer__company-info']}>
          <p>Официальный интернет-магазин «Dinomeät»</p>
          <p>ООО «ОДЛ»</p>
          <p>LLC «ODL»</p>
          <p>ИНН: 7453355413</p>
          <p>КПП: 74530100</p>
          <p>ОГРН: 1237400034530</p>
          <p>454138, Челябинская область, г. о. Челябинский, вн. р-н Курчатовский, г. Челябинск, ул. Молодогвардейцев, д. 15А, помещ. 26</p>
          <p>Телефон: +7 (922) 740-14-23</p>
        </div>
      </div>
    </footer>
  );
}

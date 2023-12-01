import { Metadata } from "next";
import Image from 'next/image';
import Map from '../../../public/contacts/map.png';
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Контакты | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Контакты.",
};

export default function Contacts() {
  return (
    <section className={styles.contacts}>
      <div className={styles.contacts__info}>
        <div className={styles.contacts__text}>
          <div>
            Наш офис находится в обл. Челябинская, г. Челябинск, ул.
            Энтузиастов, д. 12, офис 207
          </div>
          <div className={styles['contacts__work-time']}>Время работы: с 11:00 до 19:00 </div>
        </div>
      </div>
      <div className={styles.contacts__map}>
        <Image src={Map} fill={true} alt='Карта с изображения местонахождения магазина' />
      </div>
    </section>
  );
}

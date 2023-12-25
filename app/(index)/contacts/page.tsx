import Map from '@/components/Contacts/Map';
import DefaultLink from "@/components/Links/DefaultLink";
import { Metadata } from "next";
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
            Наш офис находится в г. Челябинск, ул. Молодогвардейцев, д. 15А, офис 26
          </div>
          <div className={styles["contacts__work-time"]}>
            Время работы:
          </div>
          <div className={styles["contacts__work-time"]}>
            Будние дни: 9:00-18:00
          </div>
          <div className={styles["contacts__work-time"]}>
            Выходные дни: 12:00-17:00
          </div>
        </div>
      </div>
      <Map className={styles.contacts__map} />
      <div className={styles.contacts__link}>
        <DefaultLink href="/" className={styles.contacts__button}>
          Главная
        </DefaultLink>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Доставка | Dinomeät",
  description:
    "Большой ассортимент в интернет-магазине dinomeät. Гарантия и сервис. Доставка.",
};

export default function Delivery() {
  return (
    <section className={styles.delivery}>
      <h1 className={styles.delivery__heading}>Доставка</h1>
      <div className={styles.delivery__info}>
        <p className={styles.delivery__paragraph}>
          Доставка по городу Челябинск согласовывается с менеджером и может быть
          осуществлена в день покупки или Вы можете прийти в наш офис чтобы
          пощупать и выбрать подходящую модель.
        </p>
        <p className={styles.delivery__paragraph}>
          Доставка в другие города осуществляется компанией CDEK, цены и сроки
          узнавайте у менеджеров. Возможны иные способы доставки.
        </p>
      </div>
    </section>
  );
}

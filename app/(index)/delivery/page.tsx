import type { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: "Доставка | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Гарантия и сервис. Доставка.",
};

export default function Delivery() {
  return (
    <section className={styles.delivery}>
      <h1 className={styles.delivery__heading}>Доставка</h1>
      <div className={styles.delivery__info}>
        <p className={styles.delivery__paragraph}>
          Доставка осуществляется в постаматы и пункты выдачи заказов СДЭК в
          срок от 1 дня от даты совершения заказа.
        </p>
        <p className={styles.delivery__paragraph}>
          Товар доставляется в постаматы и пункты выдачи заказов СДЭК при
          наличии полной оплаты за товар и доставку. Стоимость доставки
          составляет 200 рублей. Заказ можно оформить на сайте компании ДНС. Вес
          заказа не может быть более 20кг. При поступлении заказа в постамат /
          пункт выдачи заказов, Вам поступит смс оповещение от компании СДЭК с
          кодом для получения.
        </p>
      </div>
    </section>
  );
}

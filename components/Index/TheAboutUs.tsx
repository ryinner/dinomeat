import styles from './TheAboutUs.module.scss';

export default function TheAboutUs() {
  return (
    <section className={styles['about-us']}>
      <p className={styles['about-us__paragraph']}>
        Добро пожаловать в нашу компанию, специализирующуюся на продаже одежды
        для скейтеров!
      </p>
      <p className={styles['about-us__paragraph']}>
        Мы являемся поклонниками этого захватывающего экстремального спорта, и
        поэтому стремимся предложить только самые качественные и стильные товары
        для всех любителей скейтбординга.
      </p>
    </section>
  );
}

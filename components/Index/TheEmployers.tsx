import styles from "./TheEmployers.module.scss";

const employers = [{ id: 1 }];

export default function TheEmployers() {
  return (
    <section className={styles.employers}>
      <div className={styles.employers__heading}>Наши сотрудники</div>
      <div className={styles.employers__container}>
        <div className={styles.employers__borders} />
        <ul className={styles.employers__list}>
          {employers.map((e) => (
            <li key={e.id}>{e.id}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

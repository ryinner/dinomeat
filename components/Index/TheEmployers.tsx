import Image from 'next/image';
import Employer1 from '../../public/index/employer-1.webp';
import Employer2 from '../../public/index/employer-2.webp';
import Employer3 from '../../public/index/employer-3.webp';
import styles from "./TheEmployers.module.scss";

const employers = [
  {
    id: 1,
    image: Employer1,
    name: 'Иван',
    post: 'Менеджер'
  },
  {
    id: 2,
    image: Employer2,
    name: 'Алексей',
    post: 'Генеральный директор'
  },
  {
    id: 3,
    image: Employer3,
    name: 'Виктория',
    post: 'Менеджер'
  },
];

export default function TheEmployers() {
  return (
    <section className={styles.employers}>
      <div className={styles.employers__heading}>Наши сотрудники</div>
      <div className={styles.employers__container}>
        <div className={styles.employers__borders} />
        <ul className={styles.employers__list}>
          {employers.map((e) => (
            <li className={styles.employers__item} key={e.id}>
              <Image className={styles.employers__image} fill={true} src={e.image} alt={`${e.name} ${e.post}`} />
              <div className={styles.employers__description}>
                <span className={styles.employers__name}>{e.name}</span>
                <span className={styles.employers__post}>{e.post}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

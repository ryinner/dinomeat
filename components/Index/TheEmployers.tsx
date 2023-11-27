"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Employer1 from "../../public/index/employer-1.webp";
import Employer2 from "../../public/index/employer-2.webp";
import Employer3 from "../../public/index/employer-3.webp";
import styles from "./TheEmployers.module.scss";

const employers = [
  {
    id: 1,
    image: Employer1,
    name: "Иван",
    post: "Менеджер",
  },
  {
    id: 2,
    image: Employer2,
    name: "Алексей",
    post: "Генеральный директор",
  },
  {
    id: 3,
    image: Employer3,
    name: "Виктория",
    post: "Менеджер",
  },
];

export default function TheEmployers() {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagesListRef = useRef<HTMLUListElement>(null);
  const imageSizes = useRef<{ width: number; height: number; gap: number }>({
    width: 0,
    height: 0,
    gap: 0,
  });

  function calculateTranslateX(): number {
    return (
      -imageSizes.current.width * activeIndex -
      activeIndex * imageSizes.current.gap
    );
  }

  function getImagesSizes() {
    if (imagesListRef.current !== null) {
      let gap = 0;
      if (window.innerWidth < 768) {
        gap = imagesListRef.current.getBoundingClientRect().left;
        imagesListRef.current.style.gap = `${gap}px`;
      }
      const image = imagesListRef.current.querySelector("li");
      if (image !== null) {
        const { width, height } = image.getBoundingClientRect();
        imageSizes.current = { width, height, gap };
      }
    }
  }

  useEffect(() => {
    getImagesSizes();
    window.addEventListener("resize", getImagesSizes);

    let timer!: ReturnType<typeof setInterval>;
    if (window.innerWidth < 768) {
      setActiveIndex(1);
      timer = setInterval(() => {
        setActiveIndex((activeIndex) =>
          employers.length - activeIndex === 1 ? 0 : activeIndex + 1
        );
      }, 5000);
    } else {
      clearInterval(timer);
    }

    return () => {
      window.removeEventListener("resize", getImagesSizes);
      clearInterval(timer);
    };
  }, []);

  return (
    <section className={styles.employers}>
      <div className={styles.employers__heading}>Наши сотрудники</div>
      <div className={styles.employers__container}>
        <div className={`${styles.employers__borders} not-mobile`} />
        <motion.ul
          className={styles.employers__list}
          initial={false}
          animate={{
            x: calculateTranslateX(),
          }}
          ref={imagesListRef}
        >
          {employers.map((e) => (
            <li className={styles.employers__item} key={e.id}>
              <Image
                className={styles.employers__image}
                fill={true}
                src={e.image}
                alt={`${e.name} ${e.post}`}
              />
              <div className={styles.employers__description}>
                <span className={styles.employers__name}>{e.name}</span>
                <span className={styles.employers__post}>{e.post}</span>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeroImage1 from "../../public/index/hero-background-1.webp";
import HeroImage2 from "../../public/index/hero-background-2.webp";
import HeroImage3 from "../../public/index/hero-background-3.webp";
import HeroImage4 from "../../public/index/hero-background-4.webp";
import HeroImage5 from "../../public/index/hero-background-5.webp";
import styles from './TheHero.module.scss';

const images = [HeroImage2, HeroImage3, HeroImage1, HeroImage4, HeroImage5].reverse();

export default function TheHero() {
  const [activeIndex, setActiveIndex] = useState(5);

  const imagesListRef = useRef<HTMLUListElement>(null);
  const imageSizes = useRef<{ width: number, height: number }>({ width: 0, height: 0 });

  function calculateTranslateX () {
    const diff = activeIndex - images.length + 1;
    
    return imageSizes.current.width * diff ;
  }

  function getImagesSizes () {
    if (imagesListRef.current !== null) {
      const image = imagesListRef.current.querySelector('li');
      if (image !== null) {
        const { width, height } = image.getBoundingClientRect();
        imageSizes.current = { width, height};
      }
    }
  }

  useEffect(() => {
    getImagesSizes();
    window.addEventListener('resize', getImagesSizes)

    return () => {
      window.removeEventListener('resize', getImagesSizes)
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((activeIndex) => activeIndex === 0 ? images.length - 1 : activeIndex - 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
        <motion.ul
          className={styles.hero__viewport}
          initial={false}
          animate={{
            x: calculateTranslateX(),
          }}
          transition={{
            duration: 2,
            type: 'spring'
          }}
          ref={imagesListRef}
        >
          {images.map((image, i) => (
            <li className={styles.hero__slide} key={image.src}>
              <Image src={image} alt='' fill={true} className={styles.hero__item} />
            </li>
          ))}
        </motion.ul>
    </section>
  );
}

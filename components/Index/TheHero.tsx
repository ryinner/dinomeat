"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import Logo from '../../public/icons/logo.svg';
import HeroImage1 from "../../public/index/hero-background-1.webp";
import HeroImage2 from "../../public/index/hero-background-2.webp";
import HeroImage3 from "../../public/index/hero-background-3.webp";
import HeroImage4 from "../../public/index/hero-background-4.webp";
import HeroImage5 from "../../public/index/hero-background-5.webp";
import styles from './TheHero.module.scss';

const images = [HeroImage5, HeroImage4, HeroImage1, HeroImage3, HeroImage2];

export default function TheHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagesListRef = useRef<HTMLUListElement>(null);
  const imageSizes = useRef<{ width: number, height: number }>({ width: 0, height: 0 });

  function calculateTranslateX () {
    return -imageSizes.current.width * activeIndex - activeIndex * 20;
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
    setActiveIndex(2);
    const timer = setInterval(() => {
      setActiveIndex((activeIndex) => images.length - activeIndex === 1 ? 0 : activeIndex + 1);
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
              <Image src={image} alt='' fill={true} className={styles['hero__slide-image']} />
              <div className={styles.hero__info}>
                <div className={`${styles.hero__logo} not-mobile`}><Image width={180} src={Logo} alt='Логотип сайта' /> Dinomeät</div>
                <div className={styles.hero__slogan}>
                  <span className={styles['hero__slogan-item']}>wear shop</span>
                  <span className={styles['hero__slogan-item']}>for sport</span>
                </div>
                <div className={styles.hero__nav}>
                  <Link className={styles.hero__link} href='/catalog'>Перейти в каталог</Link>
                </div> 
              </div>
            </li>
          ))}
        </motion.ul>
    </section>
  );
}

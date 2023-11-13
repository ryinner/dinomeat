"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeroImage1 from "../../public/index/hero-background-1.webp";
import HeroImage2 from "../../public/index/hero-background-2.webp";
import HeroImage3 from "../../public/index/hero-background-3.webp";
import HeroImage4 from "../../public/index/hero-background-4.webp";
import HeroImage5 from "../../public/index/hero-background-5.webp";
import styles from './TheHero.module.scss';

export default function TheHero() {
  const [activeIndex, setActiveIndex] = useState(2);

  const images = [HeroImage2, HeroImage3, HeroImage1, HeroImage4, HeroImage5].reverse();

  function calculateTranslateX () {
    // 1 80 wh, 2 160 wh, 3 240 wh, 4 320 wh, 5 400 wh
    const diff = (activeIndex - images.length);

    return `calc(100% - 40px + (${diff * 80}vw))`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((activeIndex) => activeIndex === 0 ? images.length - 1 : activeIndex - 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, images.length]);

  return (
    <section className={styles.hero}>
        <motion.div
          className={styles.hero__viewport}
          initial={false}
          animate={{
            x: calculateTranslateX(),
          }}
          transition={{
            duration: 2,
            type: 'spring'
          }}
        >
          {images.map((image, i) => (
            <Image key={image.src} src={image} alt='' className={styles.hero__item} />
          ))}
        </motion.div>
    </section>
  );
}

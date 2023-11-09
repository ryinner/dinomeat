'use client';

import Image from 'next/image';
import HeroImage from '../../public/index/hero-background.webp';

export default function TheHero() {
  return <section>
    <Image src={HeroImage} alt='' />
  </section>
}

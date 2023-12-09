'use client';

import { ProductImagesWithImages } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ArrowLeftCarousel from '../../public/icons/arrow-left-carousel.svg';
import ArrowRightCarousel from '../../public/icons/arrow-right-carousel.svg';
import styles from './ProductImages.module.scss';

export default function ProductImages ({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesList = useRef<HTMLUListElement>(null);

  const activeItem = images[activeIndex].image;

  function handleNext () {
    setActiveIndex((prevIndex) => prevIndex + 1 === images.length ? 0 : prevIndex + 1);
  }

  function handlePrevious () {
    setActiveIndex((prevIndex) => prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1);
  }

  function handleItem (index: number) {
    setActiveIndex(index);
  }


  return <div className={styles.carousel}>
    <div className={styles.carousel__main}>
      <div className={styles.carousel__left} onClick={handlePrevious}>
        <Image src={ArrowLeftCarousel} alt='Предыдущая картинка' />
      </div>
      <picture className={styles.carousel__picture}>
        <Image src={getUrl(activeItem.url)} alt={activeItem.alt ?? ''} fill={true} className={styles.carousel__image} />
      </picture>
      <div className={styles.carousel__right} onClick={handleNext}>
        <Image src={ArrowRightCarousel} alt='Следующая картинка' />
      </div>
    </div>
    <div className={styles.carousel__controls}>
      <ul className={styles.carousel__dots} ref={imagesList}>
        {images.map((i, index) => <li key={i.id} onClick={() => handleItem(index)} className={styles.carousel__dot}>
          <Image src={getUrl(i.image.url)} key={i.id} alt={i.image.alt ?? ''} fill={true} />
        </li>)}
      </ul>
    </div>
  </div>
}

interface Props {
  images: ProductImagesWithImages[];
}
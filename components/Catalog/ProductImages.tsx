"use client";

import { ProductImagesWithImages } from "@/@types/private";
import { getUrl } from "@/services/lib/image.service";
import Image from "next/image";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import ArrowLeftCarousel from "../../public/icons/arrow-left-carousel.svg";
import ArrowRightCarousel from "../../public/icons/arrow-right-carousel.svg";
import styles from "./ProductImages.module.scss";

export default function ProductImages({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const imagesList = useRef<HTMLUListElement>(null);
  const touchRef = useRef({ startX: 0, endX: 0 });

  const activeItem = images[activeIndex].image;

  const carouselDots = (
    <ul className={styles.carousel__dots} ref={imagesList}>
      {images.map((i, index) => (
        <li
          key={i.id}
          onClick={() => handleItem(index)}
          className={styles.carousel__dot}
        >
          <Image
            className={styles['carousel__dots-image']}
            src={getUrl(i.image.url)}
            key={i.id}
            alt={i.image.alt ?? ""}
            fill={true}
            itemProp='image'
            quality={100}
          />
        </li>
      ))}
    </ul>
  );

  function handleNext() {
    setActiveIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }

  function handlePrevious() {
    setActiveIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleItem(index: number) {
    setActiveIndex(index);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchRef.current.startX = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    touchRef.current.endX = e.changedTouches[0].clientX;

    if (Math.abs(touchRef.current.startX - touchRef.current.endX) < 10) {
      return;
    }

    if (touchRef.current.startX > touchRef.current.endX) {
      handleNext();
    } else if (touchRef.current.startX < touchRef.current.endX) {
      handlePrevious();
    }

    touchRef.current = { startX: 0, endX: 0 };
  }

  function openHandler() {
    setIsOpen(true);
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "hidden";
    }
  }

  function closeHandler() {
    setIsOpen(false);
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "inherit";
    }
  }

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.carousel__main}>
          <div
            className={`${styles.carousel__left} not-mobile`}
            onClick={handlePrevious}
          >
            <Image src={ArrowLeftCarousel} alt="Предыдущая картинка" />
          </div>
          <picture
            className={styles.carousel__picture}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={getUrl(activeItem.url)}
              alt={activeItem.alt ?? ""}
              fill={true}
              className={styles.carousel__image}
              onClick={openHandler}
              quality={100}
              priority={true}
            />
          </picture>
          <div
            className={`${styles.carousel__right} not-mobile`}
            onClick={handleNext}
          >
            <Image src={ArrowRightCarousel} alt="Следующая картинка" />
          </div>
        </div>
        <div className={styles.carousel__controls}>{carouselDots}</div>
      </div>
      {isOpen &&
        createPortal(
          <div className={styles.carousel__preview}>
            <div className={styles["carousel__preview-dots"]}>
              {carouselDots}
            </div>
            <picture className={styles["carousel__preview-container"]}>
              <span
                className={styles["carousel__preview-close"]}
                onClick={closeHandler}
              >
                X
              </span>
              <Image
                src={getUrl(activeItem.url)}
                alt={activeItem.alt ?? ""}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                quality={100}
              />
            </picture>
          </div>,
          document.body
        )}
    </>
  );
}

interface Props {
  images: ProductImagesWithImages[];
}

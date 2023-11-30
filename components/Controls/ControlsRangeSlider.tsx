"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./ControlsRangeSlider.module.scss";

export default function ControlsRangeSlider({ min, max }: Props) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // При изменении левой части
  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, getPercent]);

  // При изменении правой части
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValue, getPercent]);

  function changeMinValueHandler(e: ChangeEvent<HTMLInputElement>) {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    minValRef.current = value;
  }

  function changeMaxValueHandler(e: ChangeEvent<HTMLInputElement>) {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    maxValRef.current = value;
  }

  return (
    <div className={styles.range}>
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        className={`${styles.range__thumb} ${styles["range__thumb--left"]}`}
        onChange={changeMinValueHandler}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        className={`${styles.range__thumb} ${styles["range__thumb--right"]}`}
        onChange={changeMaxValueHandler}
      />
      <div className={styles.range__track} />
      <div ref={range} className={styles.range__range} />
      <div className={`${styles.range__value} ${styles["range__value--min"]}`}>от {minValue}</div>
      <div className={`${styles.range__value} ${styles["range__value--max"]}`}>до {maxValue}</div>
    </div>
  );
}

interface Props {
  min: number;
  max: number;
}

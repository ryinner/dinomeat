"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./ControlsRangeSlider.module.scss";

export default function ControlsRangeSlider({ min, max, minValue: initialMinValue, maxValue: initialMaxValue, onChange }: Props) {
  const [minValue, setMinValue] = useState(initialMinValue ?? min);
  const [maxValue, setMaxValue] = useState(initialMaxValue ?? max);
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
    const numberValue = Number(e.target.value);
    if (!Number.isNaN(numberValue)) {
      const value = Math.min(numberValue, maxValue - 1);
      setMinValue(value);
      minValRef.current = value;
      if (onChange instanceof Function) {
        onChange({ min: numberValue, max: maxValue });
      }
    }
  }

  function changeMaxValueHandler(e: ChangeEvent<HTMLInputElement>) {
    const numberValue = Number(e.target.value);
    if (!Number.isNaN(numberValue)) {
      const value = Math.max(numberValue, minValue + 1);
      setMaxValue(value);
      maxValRef.current = value;
      if (onChange instanceof Function) {
        onChange({ min: minValue, max: value });
      }
    }
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
      <div className={styles.range__stat}>
        <div className={styles.range__value}>
          от <input className={styles.range__input} value={minValue} onChange={changeMinValueHandler} />
        </div>
        <div className={styles.range__value}>
          до <input className={styles.range__input} value={maxValue} onChange={changeMaxValueHandler} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  min: number;
  max: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (e: { min: number; max: number; }) => void;
}

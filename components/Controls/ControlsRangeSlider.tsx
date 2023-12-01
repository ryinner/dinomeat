"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./ControlsRangeSlider.module.scss";

export default function ControlsRangeSlider({ min, max, minValue: initialMinValue, maxValue: initialMaxValue, onChange }: Props) {
  const [minValue, setMinValue] = useState(initialMinValue ?? min);
  const [maxValue, setMaxValue] = useState(initialMaxValue ?? max);
  const range = useRef<HTMLDivElement>(null);
  const isNeedResize = useRef(true);
  const minInput = useRef<HTMLInputElement>(null);
  const maxInput = useRef<HTMLInputElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

    useEffect(() => {
      if (isNeedResize.current) {
        resizeRange(minValue, maxValue);
        isNeedResize.current = false;
      }
    })

  function changeMinValueHandler(e: ChangeEvent<HTMLInputElement>) {
    const numberValue = Number(e.target.value);
    if (!Number.isNaN(numberValue)) {
      const value = Math.min(numberValue, maxValue - 1);
      setMinValue(value);
      resizeRange(value, maxValue);
      if (minInput.current) {
        minInput.current.value = value.toString();
      }
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
      resizeRange(minValue, value);
      if (maxInput.current) {
        maxInput.current.value = value.toString();
      }
      if (onChange instanceof Function) {
        onChange({ min: minValue, max: value });
      }
    }
  }

  function resizeRange (min: number, max: number) {
    const minPercent = getPercent(min);
    const maxPercent = getPercent(max);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
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
          от <input ref={minInput} className={styles.range__input} defaultValue={minValue} onBlur={changeMinValueHandler} />
        </div>
        <div className={styles.range__value}>
          до <input ref={maxInput} className={styles.range__input} defaultValue={maxValue} onBlur={changeMaxValueHandler} />
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

import { PropertyWithValues } from "@/@types/private";
import { useState } from "react";
import styles from "./PropertyFilterContent.module.scss";

export default function PropertyFilterContent({ property }: Props) {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  return (
    <ul className={styles["property-filter"]}>
      {property.values.map((v) => (
        <li key={v.id} className={styles["property-filter__item"]}>
          {v.value}
        </li>
      ))}
    </ul>
  );
}

interface Props {
  property: PropertyWithValues;
}

import { PropertyWithValues } from "@/@types/private";
import { ChangeEvent, useState } from "react";
import ControlsCheckbox from '../Controls/ControlsCheckbox';
import styles from "./PropertyFilterContent.module.scss";

export default function PropertyFilterContent({ property }: Props) {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  function changeHandler (e: ChangeEvent<HTMLInputElement>) {
    const activeIdsCopy = [...activeIds];
    if (e.target.checked) {
      activeIdsCopy.push(Number(e.target.value));
    } else {
      activeIdsCopy.splice(activeIdsCopy.indexOf(Number(e.target.value)), 1);
    }
    setActiveIds(activeIdsCopy);
  }

  return (
    <ul className={styles["property-filter"]}>
      {property.values.map((v) => (
        <li key={v.id} className={styles["property-filter__item"]}>
          <ControlsCheckbox inputAttrs={{ checked: activeIds.includes(v.id), value: v.id, onChange: changeHandler}}>
            {v.value}
          </ControlsCheckbox>
        </li>
      ))}
    </ul>
  );
}

interface Props {
  property: PropertyWithValues;
}

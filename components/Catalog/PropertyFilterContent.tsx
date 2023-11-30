import { PropertyWithValues } from "@/@types/private";
import { ChangeEvent, useState } from "react";
import ControlsCheckbox from '../Controls/ControlsCheckbox';
import styles from "./PropertyFilterContent.module.scss";

export default function PropertyFilterContent({ property, onChange }: Props) {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  function changeHandler (e: ChangeEvent<HTMLInputElement>) {
    const activeIdsCopy = [...activeIds];
    if (e.target.checked) {
      activeIdsCopy.push(Number(e.target.value));
    } else {
      activeIdsCopy.splice(activeIdsCopy.indexOf(Number(e.target.value)), 1);
    }
    setActiveIds(activeIdsCopy);
    if (onChange instanceof Function) {
      onChange({ id: property.id, values_ids: activeIds });
    }
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
  onChange?: (e: { id: number, values_ids: number[] }) => void;
}

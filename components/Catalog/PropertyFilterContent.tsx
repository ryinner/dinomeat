import { PropertyWithValues } from "@/@types/private";
import { usePropsState } from '@/hooks/StateHooks';
import { ChangeEvent } from "react";
import ControlsCheckbox from '../Controls/ControlsCheckbox';
import styles from "./PropertyFilterContent.module.scss";

export default function PropertyFilterContent({ property, onChange, initialValues = [] }: Props) {
  const [activeIds, setActiveIds] = usePropsState<number[]>(initialValues);

  function changeHandler (e: ChangeEvent<HTMLInputElement>) {
    const activeIdsCopy = [...activeIds];
    if (e.target.checked) {
      activeIdsCopy.push(Number(e.target.value));
    } else {
      activeIdsCopy.splice(activeIdsCopy.indexOf(Number(e.target.value)), 1);
    }
    setActiveIds(activeIdsCopy);
    if (onChange instanceof Function) {
      onChange({ id: property.id, valuesIds: activeIdsCopy });
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
  initialValues?: number[];
  onChange?: (e: { id: number, valuesIds: number[] }) => void;
}

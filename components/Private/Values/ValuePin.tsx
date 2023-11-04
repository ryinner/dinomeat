import EditIcon from '@/components/Icons/EditIcon';
import RemoveIcon from '@/components/Icons/RemoveIcon';
import SaveIcon from '@/components/Icons/SaveIcon';
import { frontRequest } from '@/services/api/api.service';
import { Value } from '@prisma/client';
import { FormEvent, useState } from 'react';
import styles from './ValuePin.module.scss';

export default function ValuePin ({ value, onUpdate, onRemove }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(value.value);

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  };

  const editHandle = () => {
    setIsEdit(true);
  };

  const saveHandler = () => {
    frontRequest(`/api/admin/values/${value.id}`, {
      method: "PUT",
      body: JSON.stringify({ value: name }),
    }, { withMessage: true }).then(() => {
      setIsEdit(false);
      onUpdate({ ...value, value: name });
    });
  }

  const removeHandler = () => {
    frontRequest(`/api/admin/values/${value.id}`, {
      method: "DELETE",
    }, { withMessage: true }).then(() => {
      onRemove(value);
    });
  };

  return <div className={styles.value}>
    {
      isEdit ? (
        <><input value={name} onInput={inputHandler} /> <SaveIcon onClick={saveHandler} /></>
      ) : (<>
        {value.value} <EditIcon onClick={editHandle} /> <RemoveIcon onClick={removeHandler} />
      </>)
    }
  </div>
}

interface Props {
  value: Value;
  onUpdate: (value: Value) => void;
  onRemove: (value: Value) => void;
}
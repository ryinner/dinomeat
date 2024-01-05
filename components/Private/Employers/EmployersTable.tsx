"use client";

import { EmployerWithImage } from "@/@types/private";
import AddIcon from "@/components/Icons/AddIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { usePropsState } from '@/hooks/StateHooks';
import { frontRequest } from '@/services/api/api.service';
import { useRef, useState } from "react";
import EmployersTr from "./EmployersTr";

export default function EmployersTable({ employers: initialEmployers }: Props) {
  const [employers, setEmployers] = usePropsState(initialEmployers);
  const [isCreating, setIsCreating] = useState(false);
  const creatingTr = useRef<HTMLTableRowElement>(null);

  function addHandler() {
    setIsCreating(true);
  }

  function createHandler() {
    if (creatingTr.current) {
      const inputs = creatingTr.current.querySelectorAll('input');
      const formData = new FormData();
      inputs.forEach(i => {
        if (i.type === 'file' && i.files !== null) {
          formData.append('image', i.files[0]);
        } else {
          formData.append(i.name, i.value);
        }
      });
      frontRequest<{ employer: EmployerWithImage }>('/api/admin/employers', {
        method: "POST",
        body: formData
      }, { withMessage: true }).then(res => {
        setEmployers((e) => [
          res.employer,
          ...e
        ]);
        setIsCreating(false);
      });
    }
  }

  function removeHandler (employer: EmployerWithImage) {
    setEmployers(employers => employers.filter(e => e.id !== employer.id));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Должность</th>
          <th>Фото</th>
          <th>Позиция</th>
          <th>
            <AddIcon onClick={addHandler} />
          </th>
        </tr>
      </thead>
      <tbody>
        {isCreating && (
          <tr ref={creatingTr}>
            <td>
              <input name='name' placeholder="Имя" />
            </td>
            <td>
              <input name='post' placeholder="Должность" />
            </td>
            <td>
              <input name='image' type="file" placeholder="Фото" />
            </td>
            <td />
            <td>
              <SaveIcon onClick={createHandler} />
            </td>
          </tr>
        )}
        {employers.map((e) => (
          <EmployersTr employer={e} key={e.id} onRemove={removeHandler} />
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  employers: EmployerWithImage[];
}

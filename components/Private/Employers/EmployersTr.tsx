"use client";

import { EmployerWithImage } from "@/@types/private";
import EditIcon from "@/components/Icons/EditIcon";
import RemoveIcon from "@/components/Icons/RemoveIcon";
import { frontRequest } from "@/services/api/api.service";
import { getUrl } from "@/services/lib/image.service";
import Image from "next/image";
import { useState } from 'react';

export default function EmployersTr({ employer, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  function editHandler () {
    setIsEditing(true);
  }

  function removeHandler() {
    frontRequest(
      `/api/admin/employers/${employer.id}`,
      {
        method: "DELETE",
      },
      { withMessage: true }
    ).then(() => {
      onRemove(employer);
    });
  }

  return (
    <tr>
      <td>{employer.name}</td>
      <td>{employer.post}</td>
      <td>
        <Image
          src={getUrl(employer.image.url)}
          alt=""
          width={200}
          height={200}
        />
      </td>
      <td>{employer.position}</td>
      <td>
        <EditIcon onClick={editHandler} />
        <RemoveIcon onClick={removeHandler} />
      </td>
    </tr>
  );
}

interface Props {
  employer: EmployerWithImage;
  onRemove: (e: EmployerWithImage) => void;
}

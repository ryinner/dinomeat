"use client";

import { EmployerWithImage } from "@/@types/private";
import EditIcon from "@/components/Icons/EditIcon";
import RemoveIcon from "@/components/Icons/RemoveIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { frontRequest } from "@/services/api/api.service";
import { getUrl } from "@/services/lib/image.service";
import Image from "next/image";
import { useRef, useState } from "react";

export default function EmployersTr({ employer, onRemove, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const updatingTr = useRef<HTMLTableRowElement>(null);

  function editHandler() {
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

  function updateHandler() {
    if (updatingTr.current) {
      const formData = new FormData();

      updatingTr.current.querySelectorAll("input").forEach((i) => {
        if (i.type === "file") {
          if (i.files instanceof FileList && i.files[0] instanceof File) {
            formData.append("image", i.files[0]);
          }
        } else {
          if (i.value.trim() !== "") {
            formData.append(i.name, i.value);
          }
        }
      });

      frontRequest<{ employer: EmployerWithImage }>(
        `/api/admin/employers/${employer.id}`,
        {
          method: 'PUT',
          body: formData
        },
        {
          withMessage: true,
        }
      ).then(res => {
        onUpdate(res.employer);
        setIsEditing(false);
      });
    }
  }

  return (
    <>
      {isEditing ? (
        <tr ref={updatingTr}>
          <td>
            <input name="name" defaultValue={employer.name} />
          </td>
          <td>
            <input name="post" defaultValue={employer.post} />
          </td>
          <td>
            <input type="file" />
          </td>
          <td>
            <input name="position" defaultValue={employer.position} />
          </td>
          <td>
            <SaveIcon onClick={updateHandler} />
          </td>
        </tr>
      ) : (
        <tr>
          <td>{employer.name}</td>
          <td>{employer.post}</td>
          <td>
            <Image
              src={`${getUrl(employer.image.url)}?${new Date().getTime()}`}
              alt=""
              width={200}
              height={250}
            />
          </td>
          <td>{employer.position}</td>
          <td>
            <EditIcon onClick={editHandler} />
            <RemoveIcon onClick={removeHandler} />
          </td>
        </tr>
      )}
    </>
  );
}

interface Props {
  employer: EmployerWithImage;
  onRemove: (e: EmployerWithImage) => void;
  onUpdate: (e: EmployerWithImage) => void;
}

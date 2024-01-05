'use client';

import { EmployerWithImage } from '@/@types/private';
import EditIcon from '@/components/Icons/EditIcon';
import RemoveIcon from '@/components/Icons/RemoveIcon';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';

export default function EmployersTr ({ employer }: Props) {
  return <tr>
    <td>{ employer.name }</td>
    <td>{ employer.post }</td>
    <td>
      <Image
        src={getUrl(employer.image.url)}
        alt=''
        width={200}
        height={200}
      />
    </td>
    <td>{ employer.position }</td>
    <td>
      <EditIcon />
      <RemoveIcon />
    </td>
  </tr>
}

interface Props {
  employer: EmployerWithImage;
}
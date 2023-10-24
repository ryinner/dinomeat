'use client'

import Button from '@/components/Button/Button';
import { request } from '@/services/api/api.service';
import { User } from "@prisma/client";

export default function UserTr({ user, onUpdate }: Props) {
  const changeIsAdminHandler = () => {
    request(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isAdmin: !user.isAdmin })
    }).then(() => {
      onUpdate({ ...user, isAdmin: !user.isAdmin });
    });
  }

  return <tr>
    <td>{user.email}</td>
    <td>{user.name}</td>
    <td>
      <Button onClick={changeIsAdminHandler}>
        {user.isAdmin ? 'Отобрать права' : 'Дать права'}
      </Button>
    </td>
  </tr>;
}

interface Props {
  user: User;
  onUpdate: (user: User) => void
}

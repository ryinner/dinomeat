'use client';

import { usePropsState } from '@/hooks/StateHooks';
import { User } from '@prisma/client';
import UserTr from './UserTr';

export default function UsersTable ({ users: initialUsers }: Props) {
  const [users, setUsers] = usePropsState(initialUsers);

  const userUpdateHandler = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
  }

  return <table>
    <thead>
      <tr>
        <th>Почта</th>
        <th>Имя</th>
        <th>Админ?</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => <UserTr key={user.id} user={user} onUpdate={userUpdateHandler} />)}
    </tbody>
  </table>
}

interface Props {
  users: User[];
}
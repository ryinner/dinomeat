import { User } from '@prisma/client';
import { useState } from 'react';

export function UsersTable ({ users: initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers);

  return <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Почта</th>
        <th>Имя</th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>
}

interface Props {
  users: User[];
}
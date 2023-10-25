import { authConfig } from '@/configs/auth.config';
import { userFindOne } from '@/services/orm/users.service';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function OnlyAdmins ({ children }: Props) {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    redirect('/');
  }

  const user = await userFindOne({ where: {
    id: session.user.id
  }});

  if (!user || !user?.isAdmin) {
    redirect('/');
  }

  return <>{children}</>;
}

interface Props {
  children: React.ReactNode;
}


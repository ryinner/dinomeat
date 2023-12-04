'use client';

import { request } from '@/services/api/api.service';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function TheUserForm ({ user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: user?.email ?? '',
      name: user?.name ?? '',
    }
  });
  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    request('/api/auth/sign-up', {
      body: JSON.stringify(data)
    }).then(() => {
      redirect('/auth/sign-in')
    }).catch((err) => {
    });
  };

  const isSignUp = Boolean(user?.id);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <label>
      ФИО
      <input {...register('name', { required: 'Поле ФИО обязательно для заполнения', minLength: 2 })} />
    </label>
    <label>
      Почта
      <input type="email" {...register('email', { required: 'Поле почта обязательно для заполнения', minLength: 2, })} />
    </label>
    <label>
      Телефон
      <input {...register('phone', { required: 'Поле телефон обязательно для заполнения', minLength: 6, })} />
    </label>
    {
      isSignUp && <label>
        Пароль
        <input {...register('password', { required: 'Поле пароль обязательно для заполнения', minLength: 8, })} />
      </label>
    }
  </form>
}

interface Props {
  user?: Pick<User, 'id' | 'email' | 'name'>;
}

interface Inputs {
  email: string;
  name: string;
  phone: string;
  password?: string;
}
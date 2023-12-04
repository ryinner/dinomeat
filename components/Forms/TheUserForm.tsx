'use client';

import { request } from '@/services/api/api.service';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import ControlsInput from '../Controls/ControlsInputs';
import styles from './TheUserForm.module.scss';

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

  const isSignUp = !Boolean(user?.id);

  return <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <label>
      ФИО
      <ControlsInput {...register('name', { required: 'Поле ФИО обязательно для заполнения', minLength: 2 })} />
    </label>
    <label>
      Почта
      <ControlsInput type="email" {...register('email', { required: 'Поле почта обязательно для заполнения', minLength: 2, })} />
    </label>
    <label>
      Телефон
      <ControlsInput {...register('phone', { required: 'Поле телефон обязательно для заполнения', minLength: 6, })} />
    </label>
    {
      isSignUp && <label>
        Пароль
        <ControlsInput {...register('password', { required: 'Поле пароль обязательно для заполнения', minLength: 8, })} />
      </label>
    }
    <Button>{isSignUp ? 'Зарегистрироваться' : 'Обновить' }</Button>
    { isSignUp && <Button onClick={() => signIn('vk')}>Войти через VK</Button> }
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
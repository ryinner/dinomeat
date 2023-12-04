'use client';

import { User } from '@prisma/client';
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
  const onSubmit: SubmitHandler<Inputs> = (data, e) => console.log(data, e);

  const isSignUp = Boolean(user?.id);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <label>
      Имя
      <input {...register('name', { required: true, minLength: 2 })} />
    </label>
    <label>
      Почта
      <input type="email" {...register('email', { required: true, minLength: 2, })} />
    </label>
    <label>
      Телефон
      <input {...register('phone', { required: true, minLength: 8, })} />
    </label>
  </form>
}

interface Props {
  user?: Pick<User, 'id' | 'email' | 'name'>;
}

interface Inputs {
  email: string;
  name: string;
  phone: string;
}
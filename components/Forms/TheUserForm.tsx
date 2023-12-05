'use client';

import { request } from '@/services/api/api.service';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import ControlsInput from '../Controls/ControlsInputs';
import styles from './AuthForms.module.scss';
import VkAuthButton from './VkAuthButton';

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
    <label className={styles.form__label}>
      ФИО
      <ControlsInput className={styles.form__input} {...register('name', { required: 'Поле ФИО обязательно для заполнения', minLength: 2 })} />
      { errors.name && <span className={styles.form__error}>* введите имя длинной не менее 2 символов</span> }
    </label>
    <label className={styles.form__label}>
      Почта
      <ControlsInput className={styles.form__input} type="email" {...register('email', { required: 'Поле почта обязательно для заполнения', minLength: 2, })} />
      { errors.email && <span className={styles.form__error}>* введите почту длинной не менее 2 символов</span> }
    </label>
    <label className={styles.form__label}>
      Телефон
      <ControlsInput className={styles.form__input} {...register('phone', { required: 'Поле телефон обязательно для заполнения', minLength: 6, })} />
      { errors.phone && <span className={styles.form__error}>* введите телефон</span> }
    </label>
    {
      isSignUp && <label className={styles.form__label}>
        Пароль
        <ControlsInput className={styles.form__input} type='password' {...register('password', { required: 'Поле пароль обязательно для заполнения', minLength: 8, })} />
        { errors.password && <span className={styles.form__error}>* введите пароль</span> }
      </label>
    }
    <div className={styles['form__button-section']}>
      <Button>{isSignUp ? 'Зарегистрироваться' : 'Обновить' }</Button>
      { isSignUp && <VkAuthButton /> }
    </div>
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
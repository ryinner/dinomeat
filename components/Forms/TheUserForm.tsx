'use client';

import { request } from '@/services/api/api.service';
import { isEmail } from '@/services/lib/validation.service';
import { User } from '@prisma/client';
import { RedirectType, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import ControlsInput from '../Controls/ControlsInputs';
import DefaultLink from '../Links/DefaultLink';
import styles from './AuthForms.module.scss';

const initialServerErrors: ServerError = { message: '' };

export default function TheUserForm ({ user }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState(initialServerErrors);

  const isSignUp = !Boolean(user?.id);

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
      body: JSON.stringify(data),
      method: 'POST',
    }).then(() => {
      router.push('/auth/sign-in', RedirectType.push);
    }).catch(async (err: Response) => {
      const answer = await err.json() as ServerError;
      setServerError(answer);
    });
  };


  return <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <label className={styles.form__label}>
      ФИО
      <ControlsInput className={styles.form__input} {...register('name', { required: 'Поле ФИО обязательно для заполнения', minLength: 2 })} />
      { errors.name && <span className={styles.form__error}>* введите имя длинной не менее 2 символов</span> }
    </label>
    <label className={styles.form__label}>
      Почта
      <ControlsInput className={styles.form__input} inputMode='email' type="email" {...register('email', { required: 'Поле почта обязательно для заполнения', validate: isEmail })} />
      { errors.email && <span className={styles.form__error}>* введите почту длинной не менее 2 символов</span> }
    </label>
    <label className={styles.form__label}>
      Телефон
      <ControlsInput className={styles.form__input} inputMode='tel' type='tel' {...register('phone', { required: 'Поле телефон обязательно для заполнения', minLength: 6, })} />
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
      { serverError.message !== '' && <span className={styles.form__error}>* {serverError.message}</span> }
    </div>
    <div className={styles['form__button-section']}>
      <DefaultLink className={styles.form__link} href='/auth/sign-in'>Войти</DefaultLink>
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

interface ServerError {
  message: string;
}
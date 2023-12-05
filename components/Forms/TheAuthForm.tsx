'use client';

import { isEmail } from "@/services/lib/validation.service";
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button/Button";
import ControlsInput from "../Controls/ControlsInputs";
import DefaultLink from '../Links/DefaultLink';
import styles from "./AuthForms.module.scss";
import VkAuthButton from './VkAuthButton';

export default function TheAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState({ message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(res => {
      if (res?.error) {
        setServerError({ message: 'Неверная почта или пароль' })
      }
      if (res?.ok) {
        router.push(searchParams.get('redirectUri') ?? '/profile');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.form__label}>
        Почта
        <ControlsInput
          className={styles.form__input}
          inputMode="email"
          type="email"
          {...register("email", {
            required: "Поле почта обязательно для заполнения",
            validate: isEmail,
          })}
        />
        {errors.email && (
          <span className={styles.form__error}>
            * введите почту длинной не менее 2 символов
          </span>
        )}
      </label>
      <label className={styles.form__label}>
        Пароль
        <ControlsInput
          className={styles.form__input}
          type="password"
          {...register("password", {
            required: "Поле пароль обязательно для заполнения",
            minLength: 8,
          })}
        />
        {errors.password && (
          <span className={styles.form__error}>* введите пароль</span>
        )}
      </label>
      <div className={styles["form__button-section"]}>
        <Button>Войти</Button>
        {serverError.message !== "" && (
          <span className={styles.form__error}>* {serverError.message}</span>
        )}
        <VkAuthButton />
      </div>
      <div className={styles['form__button-section']}>
        <DefaultLink className={styles.form__link} href='/auth/sign-up'>Зарегистрироваться</DefaultLink>
      </div>
    </form>
  );
}

interface Inputs {
  email: string;
  password: string;
}

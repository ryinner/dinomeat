"use client";

import { SiteUser } from '@/@types/private';
import { request } from "@/services/api/api.service";
import { isEmail } from "@/services/lib/validation.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button/Button";
import ControlsInput from "../Controls/ControlsInputs";
import ArrowIcon from '../Icons/ArrowIcon';
import DefaultLink from "../Links/DefaultLink";
import styles from "./AuthForms.module.scss";

const initialServerErrors: ServerError = { message: "" };

export default function TheUserForm({ user }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState(initialServerErrors);
  const [success, setSuccess] = useState('');

  const isSignUp = !Boolean(user?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: user?.email ?? "",
      name: user?.name ?? "",
      phone: user?.phone ?? "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
      request(isSignUp ? '/api/auth/sign-up' : '/api/profile', {
        body: JSON.stringify(data),
        method: isSignUp ? "POST" : "PUT",
      })
        .then(() => {
          if (isSignUp) {
            router.push("/auth/sign-in");
          } else {
            setSuccess('Обновлено');
          }
        })
        .catch(async (err: Response) => {
          const answer = (await err.json()) as ServerError;
          setServerError(answer);
        });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.form__label}>
        ФИО
        <ControlsInput
          className={styles.form__input}
          {...register("name", {
            required: "Поле ФИО обязательно для заполнения",
            minLength: 2,
          })}
        />
        {errors.name && (
          <span className={styles.form__error}>
            * введите имя длинной не менее 2 символов
          </span>
        )}
      </label>
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
        Телефон
        <ControlsInput
          className={styles.form__input}
          inputMode="tel"
          type="tel"
          {...register("phone", {
            required: "Поле телефон обязательно для заполнения",
            minLength: 6,
          })}
        />
        {errors.phone && (
          <span className={styles.form__error}>* введите телефон</span>
        )}
      </label>
      {isSignUp && (
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
      )}
      <div className={styles["form__button-section"]}>
        <Button>{isSignUp ? "Зарегистрироваться" : "Сохранить"}</Button>
        {serverError.message !== "" && (
          <span className={styles.form__error}>* {serverError.message}</span>
        )}
        { success !== '' && <span>{ success }</span>}
      </div>
      <div className={styles["form__button-section"]}>
        {isSignUp ? (
          <DefaultLink className={styles.form__link} href="/auth/sign-in">
            Войти
          </DefaultLink>
        ) : (
          <>
            <DefaultLink className={styles.form__link} href="/catalog">
              К покупкам
            </DefaultLink>
            <DefaultLink className={styles.form__link} href="/">
              Главная  <ArrowIcon />
            </DefaultLink>
          </>
        )}
      </div>
    </form>
  );
}

interface Props {
  user?: SiteUser;
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

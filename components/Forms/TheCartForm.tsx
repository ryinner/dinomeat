"use client";

import { SiteUser } from "@/@types/private";
import { isEmail } from "@/services/lib/validation.service";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from '../Button/Button';
import ControlsInput from '../Controls/ControlsInputs';
import styles from './TheCartForm.module.scss';

export default function TheCartForm({ user, cartSum, className }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: user?.email ?? "",
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      city: "",
      postal_code: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <fieldset className={styles.cart__inputs}>
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
        <label className={styles.form__label}>
          Город
          <ControlsInput
            className={styles.form__input}
            {...register("city", {
              required: "Поле город обязательно для заполнения",
              minLength: 2,
            })}
          />
          {errors.city && (
            <span className={styles.form__error}>
              * введите город
            </span>
          )}
        </label>
        <label className={styles.form__label}>
          Почтовый код
          <ControlsInput
            className={styles.form__input}
            {...register("postal_code", {
              required: "Поле почтовый код обязательно для заполнения",
              minLength: 6,
            })}
          />
          {errors.postal_code && (
            <span className={styles.form__error}>
              * введите почтовый код
            </span>
          )}
        </label>
        <label className={styles.form__label}>
          Адрес
          <ControlsInput
            className={styles.form__input}
            {...register("address", {
              required: "Поле адрес обязательно для заполнения",
              minLength: 2,
            })}
          />
          {errors.address && (
            <span className={styles.form__error}>
              * введите адрес код
            </span>
          )}
        </label>
      </fieldset>
      <div className={styles.cart__total}>
        <span>К оплате:</span>
        <span className={styles.cart__price}>{cartSum} ₽</span>
      </div>
      <div className={styles.cart__controls}>
        <Button>Оформить заказ</Button>
      </div>
    </form>
  );
}

interface Props {
  user?: SiteUser;
  cartSum: number;
  className?: string;
}

interface Inputs {
  email: string;
  name: string;
  phone: string;
  city: string;
  postal_code: string;
  address: string;
}

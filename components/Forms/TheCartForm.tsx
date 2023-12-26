"use client";

import { SiteUser } from "@/@types/private";
import { frontRequest } from '@/services/api/api.service';
import { isEmail } from "@/services/lib/validation.service";
import { Order } from '@prisma/client';
import { SubmitHandler, useForm } from "react-hook-form";
import Button from '../Button/Button';
import ControlsInput from '../Controls/ControlsInputs';
import { useCart } from '../TheProviders/TheCartContext';
import styles from './TheCartForm.module.scss';

export default function TheCartForm({ user, cartSum }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: user?.email ?? "",
      username: user?.name ?? "",
      phone: user?.phone ?? "",
      city: "",
      postalCode: "",
      address: "",
    },
  });
  const { cart, cleanCart } = useCart();

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    frontRequest<{ order: Order }>('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ cart, order: data })
    }, { withMessage: false }).then(res => {
      const { id } = res.order;
      if (id) {
        cleanCart();
      }
      console.log(id);
      // Перенаправить на Альфу
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.cart}>
      <fieldset className={styles.cart__inputs}>
        <label className={styles.cart__label}>
          ФИО
          <ControlsInput
            className={styles.cart__input}
            {...register("username", {
              required: "Поле ФИО обязательно для заполнения",
              minLength: 2,
            })}
            autoComplete='name'
          />
          {errors.username && (
            <span className={styles.cart__error}>
              * введите имя длинной не менее 2 символов
            </span>
          )}
        </label>
        <label className={styles.cart__label}>
          Почта
          <ControlsInput
            className={styles.cart__input}
            inputMode="email"
            type="email"
            {...register("email", {
              required: "Поле почта обязательно для заполнения",
              validate: isEmail,
            })}
          />
          {errors.email && (
            <span className={styles.cart__error}>
              * введите почту длинной не менее 2 символов
            </span>
          )}
        </label>
        <label className={styles.cart__label}>
          Телефон
          <ControlsInput
            className={styles.cart__input}
            inputMode="tel"
            type="tel"
            {...register("phone", {
              required: "Поле телефон обязательно для заполнения",
              minLength: 6,
            })}
          />
          {errors.phone && (
            <span className={styles.cart__error}>* введите телефон</span>
          )}
        </label>
        <label className={styles.cart__label}>
          Город
          <ControlsInput
            className={styles.cart__input}
            {...register("city", {
              required: "Поле город обязательно для заполнения",
              minLength: 2,
            })}
          />
          {errors.city && (
            <span className={styles.cart__error}>
              * введите город
            </span>
          )}
        </label>
        <label className={styles.cart__label}>
          Почтовый код
          <ControlsInput
            className={styles.cart__input}
            {...register("postalCode", {
              required: "Поле почтовый код обязательно для заполнения",
              minLength: 6,
            })}
          />
          {errors.postalCode && (
            <span className={styles.cart__error}>
              * введите почтовый код
            </span>
          )}
        </label>
        <label className={styles.cart__label}>
          Адрес
          <ControlsInput
            className={styles.cart__input}
            {...register("address", {
              required: "Поле адрес обязательно для заполнения",
              minLength: 2,
            })}
          />
          {errors.address && (
            <span className={styles.cart__error}>
              * введите адрес
            </span>
          )}
        </label>
      </fieldset>
      <div className={styles.cart__total}>
        <span>К оплате:</span>
        <span className={styles.cart__price}>{cartSum} ₽</span>
      </div>
      <div className={styles.cart__controls}>
        <Button className={styles.cart__buy}>Оформить заказ</Button>
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
  username: string;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
}

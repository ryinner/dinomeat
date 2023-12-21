"use client";

import { SiteUser } from "@/@types/private";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from '../Button/Button';
import styles from './TheCartForm.module.scss';

export default function TheCartForm({ user, cartSum }: Props) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.cart__inputs}>
        
      </div>
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
}

interface Inputs {
  email: string;
  name: string;
  phone: string;
  city: string;
  postal_code: string;
  address: string;
}

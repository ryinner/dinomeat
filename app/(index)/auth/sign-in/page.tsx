import TheAuthForm from '@/components/Forms/TheAuthForm';
import { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: "Авторизация | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Вход в аккаунт.",
}

export default function TheSignIn () {
  return <section className={styles.section}>
    <TheAuthForm />
  </section>
}
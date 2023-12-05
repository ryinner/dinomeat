import TheUserForm from '@/components/Forms/TheUserForm';
import { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: "Регистрация | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Создание аккаунта.",
}

export default function TheSignUp () {
  return <section className={styles.section}>
    <TheUserForm />
  </section>
}
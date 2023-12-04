import TheUserForm from '@/components/Forms/TheUserForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Регистрация | Dinomeät",
  description: "Большой ассортимент в интернет-магазине dinomeät. Создание аккаунта.",
}

export default function TheSignUp () {
  return <section>
    <TheUserForm />
  </section>
}
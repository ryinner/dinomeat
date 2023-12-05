import { signIn } from 'next-auth/react';
import Button from '../Button/Button';

export default function VkAuthButton () {
  return  <Button onClick={() => signIn('vk')}>Войти через VK</Button>
}
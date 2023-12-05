'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Button from '../Button/Button';

export default function VkAuthButton () {
  const searchParams = useSearchParams();

  return  <Button onClick={() => signIn('vk', { redirect: false, callbackUrl: searchParams.get('redirectUri') ?? '/profile' })}>Войти через VK</Button>
}
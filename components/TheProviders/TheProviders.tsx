'use client';

import { SessionProvider } from "next-auth/react";

export function TheProviders({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

interface Props {
  children: React.ReactNode;
}

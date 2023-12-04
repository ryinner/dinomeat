'use client';

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function TheProviders({ children }: Props) {
  return <>
    <SessionProvider>
      {children}
      <ToastContainer
        hideProgressBar={true}
        theme="dark"
        autoClose={3000}
      />
    </SessionProvider>
  </>;
}

interface Props {
  children: React.ReactNode;
}

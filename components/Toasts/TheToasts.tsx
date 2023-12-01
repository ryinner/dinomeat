'use client';

import type { Toast as ToastType } from '@/@types/private';
import React, { createContext, useState } from 'react';
import styles from './TheToasts.module.scss';
import Toast from './Toast';

export const ToastsDispatchContext = createContext(null);

export default function TheToasts ({ children }: Props) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  
  return <ToastsDispatchContext.Provider value={null}>
    <aside className={styles.toasts}>
      {toasts.map(t => <Toast key={1} toast={t} onRemove={() => {}} /> )}
    </aside>
    {children}
  </ToastsDispatchContext.Provider>;
}

interface Props {
  children: React.ReactNode;
}

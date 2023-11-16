'use client';

import TheNavigationCategoriesProvider from './TheNavigationCategoriesContext';


export function TheSiteProviders({ children }: Props) {
  return <>
    <TheNavigationCategoriesProvider>
      {children}
    </TheNavigationCategoriesProvider>
  </>;
}

interface Props {
  children: React.ReactNode;
}

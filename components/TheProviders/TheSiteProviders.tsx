'use client';

import TheCartProvider from './TheCartContext';
import TheNavigationCategoriesProvider from './TheNavigationCategoriesContext';


export function TheSiteProviders({ children }: Props) {
  return <>
    <TheNavigationCategoriesProvider>
      <TheCartProvider>
        {children}
      </TheCartProvider>
    </TheNavigationCategoriesProvider>
  </>;
}

interface Props {
  children: React.ReactNode;
}

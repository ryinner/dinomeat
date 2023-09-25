import TheFooter from '@/components/Layout/TheFooter';
import TheHeader from '@/components/Layout/TheHeader';
import TheIntegrationsInitializations from '@/components/Layout/TheIntegrationsInitializations';
import TheIntegrationsScripts from '@/components/Layout/TheIntegrationsScripts';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Denomeat',
  description: 'Компания denomeat - лучшая одежда в России.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <TheIntegrationsScripts />
      </head>
      <body className={inter.className}>
        <TheHeader />
          {children}
        <TheFooter />
        <TheIntegrationsInitializations />
      </body>
    </html>
  )
}

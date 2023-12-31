import TheCategoriesNavigation from '@/components/Layout/TheCategoriesNavigation';
import TheFooter from "@/components/Layout/TheFooter";
import TheHeader from "@/components/Layout/TheHeader";
import TheIntegrationsInitializations from "@/components/Layout/TheIntegrationsInitializations";
import TheIntegrationsScripts from "@/components/Layout/TheIntegrationsScripts";
import { TheProviders } from "@/components/TheProviders/TheProviders";
import { TheSiteProviders } from '@/components/TheProviders/TheSiteProviders';
import type { Metadata, Viewport } from "next";
import "../globals.scss";
import { MuseoSansCyrl } from "../styles/fonts";

export const metadata: Metadata = {
  title: "Dinomeät - магазин обуви и одежды",
  description: "Мы предлагаем большой выбор Качественной и Оригинальной продукции по доступной цене.",
  icons: {
    icon: '/icon.png'
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL)
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <TheIntegrationsScripts />
      </head>
      <body className={MuseoSansCyrl.className}>
        <TheProviders>
          <TheSiteProviders>
            <TheHeader />
            <TheCategoriesNavigation />
            <main>{children}</main>
            <TheFooter />
          </TheSiteProviders>
        </TheProviders>
        <TheIntegrationsInitializations />
      </body>
    </html>
  );
}

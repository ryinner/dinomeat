import TheFooter from "@/components/Layout/TheFooter";
import TheHeader from "@/components/Layout/TheHeader";
import TheIntegrationsInitializations from "@/components/Layout/TheIntegrationsInitializations";
import TheIntegrationsScripts from "@/components/Layout/TheIntegrationsScripts";
import { TheProviders } from "@/components/TheProviders/TheProviders";
import type { Metadata, Viewport } from "next";
import "../globals.scss";
import { MuseoSansCyrl } from "../styles/fonts";

export const metadata: Metadata = {
  title: "Denomeat",
  description: "Компания denomeat - лучшая одежда в России.",
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
          <TheHeader />
          <main>{children}</main>
          <TheFooter />
        </TheProviders>
        <TheIntegrationsInitializations />
      </body>
    </html>
  );
}

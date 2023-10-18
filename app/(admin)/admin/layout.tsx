import { MuseoSansCyrl } from '@/app/styles/fonts';
import ThePrivateFooter from "@/components/Private/PrivateLayout/ThePrivateFooter";
import ThePrivateHeader from "@/components/Private/PrivateLayout/ThePrivateHeader";
import '../../globals.scss';
import styles from './layout.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={MuseoSansCyrl.className}>
        <ThePrivateHeader />
        <main className={styles.main}>{children}</main>
        <ThePrivateFooter />
      </body>
    </html>
  );
}

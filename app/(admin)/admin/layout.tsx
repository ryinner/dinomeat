import ThePrivateFooter from "@/components/PrivateLayout/ThePrivateFooter";
import ThePrivateHeader from "@/components/PrivateLayout/ThePrivateHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ThePrivateHeader />
        <main>{children}</main>
        <ThePrivateFooter />
      </body>
    </html>
  );
}

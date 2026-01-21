
import "./globals.css";

export const metadata = {
  title: "LOUD Multistream",
  description: "Acompanhe as lives da LOUD em tempo real",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

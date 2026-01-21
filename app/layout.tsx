
import "./globals.css";
import React from "react";

export const metadata = {
  title: "LOUD Multistream",
  description: "O caminho até Las Vegas"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

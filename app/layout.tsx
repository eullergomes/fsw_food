import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "./_context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSW Food",
  description: "Projeto de delivery de comida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "./_context/cart";
import AuthProvider from "./_providers/auth";
import { Toaster } from "@/app/_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSW Food",
  description: "O melhor delivery de comida!",
  authors: [{ name: "Euller Gomes" }],
  creator: "Euller Gomes",
  keywords: ["Delivery", "Food", "FSWFood"],
  applicationName: "FSW Food",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "FSW Food",
    description: "O melhor delivery de comida!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

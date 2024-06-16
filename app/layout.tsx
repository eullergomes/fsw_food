import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CartProvider from "./_context/cart";
import AuthProvider from "./_providers/auth";
import { Toaster } from "@/app/_components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fswfood-euller-gomes-projects.vercel.app/"),
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
    images: [
      {
        url: "/logo.png",
        width: 552,
        height: 552,
        alt: "FSW Food Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

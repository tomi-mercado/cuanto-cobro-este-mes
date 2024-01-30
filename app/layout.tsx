import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cuánto cobro",
  description: "Mi sueldo en ARS este mes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className="h-full">
      <body className={cn(inter.className, "h-full", "dark")}>
        <Header />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";



const appFont = Exo({
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "Ai ui/ux Generator",
  description: "create high quality free ui/ux custom mockup designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={appFont.className}>{children}</body>
    </html>
  );
}

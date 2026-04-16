import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Morgan | Full Stack Developer",
  description: "Premium portfolio for a full stack developer.",
  icons: {
    icon: "/ho_bj_logo_refined.svg",
    shortcut: "/ho_bj_logo_refined.svg",
    apple: "/ho_bj_logo_refined.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <head />
      <body className="min-h-full bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}

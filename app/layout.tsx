import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import Providers from "./provider";
import { ThemeProvider } from 'next-themes';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Web",
  description: "Not your typical blogging website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  suppressHydrationWarning  
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
<Providers><ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}        </ThemeProvider>
</Providers></body>
    </html>
  );
}

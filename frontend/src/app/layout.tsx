import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurenix AI - Your AI Sidekick for Enhanced Productivity",
  description: "Experience the future of work with Aurenix AI. Boost your productivity and creativity with our cutting-edge AI assistant.",
  keywords: ["AI Assistant", "Productivity Tools", "Artificial Intelligence", "Workflow Automation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-primary text-white antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";
import SiteNavbar from "@/components/shared/site-navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "STRATCOL DEMO - Boutique Dashboard Sandbox",
  description: "Created by jacofrontend.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}
    >
      <body>
        <TooltipProvider>
          <SiteNavbar />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Providers from "@/components/Providers";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter-tight", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  authors: [{ name: "Arjun Krishna Krishnakumar" }],
};

export const viewport: Viewport = { themeColor: "#F7F7F7" };

// Flags a first visit (per session) before paint so the intro loader can cover the page without a flash.
const introScript = `try{if(!sessionStorage.getItem('ak-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='1'}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="intro-flag" strategy="beforeInteractive">
          {introScript}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

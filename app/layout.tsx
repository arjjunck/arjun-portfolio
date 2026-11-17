import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Backdrop from "@/components/fx/Backdrop";
import MotionProvider from "@/components/fx/MotionProvider";
import "./globals.css";

// Archivo (variable weight and width) for the heavy, wide headlines and body; JetBrains Mono for code.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  authors: [{ name: "Arjun Krishna Krishnakumar" }],
};

export const viewport: Viewport = { themeColor: "#EEF0F2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <MotionProvider>
          <Backdrop />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

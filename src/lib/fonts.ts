import { Inter } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export function getFontClassName(locale: string): string {
  return locale === "ar"
    ? `${fontArabic.variable} ${fontSans.variable} font-arabic`
    : `${fontSans.variable} font-sans`;
}

import type { Locale } from "@/i18n/routing";

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function isArabic(locale: Locale): boolean {
  return locale === "ar";
}

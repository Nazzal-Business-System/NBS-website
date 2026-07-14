"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  className?: string;
  compact?: boolean;
  showLabel?: boolean;
  variant?: "default" | "header";
};

const locales = ["en", "ar"] as const;

export function LocaleSwitcher({
  className,
  compact = false,
  showLabel = false,
  variant = "default",
}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const tA11y = useTranslations("a11y");

  const labels: Record<Locale, string> = {
    en: t("localeEn"),
    ar: t("localeAr"),
  };

  function switchLocale(next: Locale) {
    if (next === locale) return;
    const search =
      typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${search}${hash}`, { locale: next });
  }

  if (variant === "header") {
    const otherLocale = locale === "en" ? "ar" : "en";

    return (
      <button
        type="button"
        onClick={() => switchLocale(otherLocale)}
        className={cn(
          "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-hairline bg-bg-inset/70 px-3.5 text-sm font-medium text-text-secondary transition-[color,background-color,border-color] duration-[var(--duration-normal)] hover:border-border-emphasis hover:text-text-primary",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
          className,
        )}
        aria-label={tA11y("languageSwitcher")}
      >
        <Globe className="size-4 shrink-0" aria-hidden />
        <span lang={locale}>{labels[locale]}</span>
        <ChevronDown className="size-3.5 shrink-0 opacity-70" aria-hidden />
      </button>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {showLabel ? (
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {tA11y("language")}
        </span>
      ) : null}
      <div
        className={cn(
          "inline-flex items-center rounded-lg border border-border-hairline bg-bg-inset/60 p-0.5",
          compact ? "gap-0" : "gap-0.5",
        )}
        role="group"
        aria-label={tA11y("languageSwitcher")}
      >
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => switchLocale(code)}
            className={cn(
              "relative min-h-11 min-w-11 cursor-pointer rounded-md text-xs font-semibold uppercase tracking-wide transition-[color,background-color,box-shadow] duration-[var(--duration-normal)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
              compact ? "px-2.5" : "min-w-11 px-3",
              locale === code
                ? "bg-bg-elevated text-text-primary shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
                : "text-text-muted hover:text-text-secondary",
            )}
            aria-pressed={locale === code}
            lang={code}
          >
            {labels[code]}
          </button>
        ))}
      </div>
    </div>
  );
}

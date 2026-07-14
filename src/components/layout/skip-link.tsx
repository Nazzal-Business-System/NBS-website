"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("a11y");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-primary"
    >
      {t("skipToContent")}
    </a>
  );
}

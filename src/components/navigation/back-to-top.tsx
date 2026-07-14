"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

const SHOW_AFTER_PX = 500;

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function getScrollPastThreshold() {
  return window.scrollY > SHOW_AFTER_PX;
}

function getServerSnapshot() {
  return false;
}

export function BackToTop() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const visible = useSyncExternalStore(
    subscribeScroll,
    getScrollPastThreshold,
    getServerSnapshot,
  );

  const handleClick = useCallback(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      className={cn(
        "nbs-back-to-top",
        isRtl ? "nbs-back-to-top--start" : "nbs-back-to-top--end",
        visible && "is-visible",
      )}
      aria-label={t("backToTop")}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={handleClick}
    >
      <ArrowUp className="size-5" aria-hidden strokeWidth={2.25} />
    </button>
  );
}

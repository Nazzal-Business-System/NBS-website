"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import {
  homepageAnchors,
  homepageHref,
  homepageSectionIds,
} from "@/config/navigation";
import { getWhatsAppUrl } from "@/config/site";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { BrandMark } from "@/components/brand/brand-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { IconButton } from "@/components/ui/icon-button";
import { LocaleSwitcher } from "./locale-switcher";
import { NavLink } from "./nav-link";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const trapRef = useFocusTrap(open);
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const links = [
    {
      href: homepageHref(homepageSectionIds.innovationErp),
      label: t("common.productErp"),
    },
    {
      href: homepageHref(homepageSectionIds.pos),
      label: t("common.productPos"),
    },
    {
      href: homepageHref(homepageSectionIds.inventory),
      label: t("common.productIms"),
    },
    {
      href: homepageHref(homepageAnchors.services),
      label: t("nav.services"),
    },
    {
      href: { pathname: "/pricing" as const },
      label: t("nav.pricing"),
    },
    {
      href: homepageHref(homepageAnchors.about),
      label: t("nav.about"),
    },
    {
      href: homepageHref(homepageAnchors.contact),
      label: t("nav.contact"),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t("a11y.mobileNavigation")}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px] motion-safe:transition-opacity motion-safe:duration-[var(--duration-normal)]"
        aria-label={t("a11y.closeMenu")}
        onClick={onClose}
      />

      <div
        ref={trapRef}
        className="absolute inset-y-0 end-0 flex w-full max-w-[min(100%,22rem)] flex-col border-s border-border-emphasis bg-bg-elevated shadow-[var(--shadow-nav-elevated)] motion-safe:transition-transform motion-safe:duration-[var(--duration-slow)]"
      >
        <div className="flex items-center justify-between border-b border-border-hairline px-4 py-3.5">
          <BrandMark />
          <IconButton label={t("a11y.closeMenu")} onClick={onClose}>
            <X className="size-5" aria-hidden />
          </IconButton>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
          aria-label={t("a11y.mainNavigation")}
        >
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t("nav.systems")}
          </p>
          {links.map((link) => (
            <NavLink
              key={
                typeof link.href === "string"
                  ? link.href
                  : `${link.href.pathname}#${"hash" in link.href ? link.href.hash ?? "" : ""}`
              }
              href={link.href}
              mobile
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border-hairline p-4">
          <LocaleSwitcher className="w-full items-center" showLabel />
          <ButtonLink
            href={homepageHref(homepageAnchors.contact)}
            variant="primary"
            className="w-full"
            onClick={onClose}
          >
            {t("nav.discussCta")}
          </ButtonLink>
          {whatsappUrl ? (
            <ButtonLink
              href={whatsappUrl}
              variant="secondary"
              className="w-full"
              external
            >
              {t("a11y.whatsapp")}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import {
  homepageAnchors,
  homepageHref,
} from "@/config/navigation";
import { getWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/lib/use-scrolled";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ButtonLink } from "@/components/ui/button-link";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(10);
  const whatsappUrl = getWhatsAppUrl();

  const navLinks = [
    {
      href: homepageHref(homepageAnchors.systems),
      label: t("nav.systems"),
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
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--duration-slow)]",
          scrolled
            ? "border-border-emphasis bg-bg-overlay/95 shadow-[var(--shadow-nav-elevated)] backdrop-blur-md"
            : "border-transparent bg-bg-base/55 backdrop-blur-sm",
        )}
      >
        <Container
          as="div"
          className="flex h-[var(--height-nav)] items-center justify-between gap-4 lg:gap-6"
        >
          <BrandLockup compact priority ariaLabel={t("a11y.homeLink")} />

          <nav
            className="hidden items-center lg:flex"
            aria-label={t("a11y.mainNavigation")}
          >
            {navLinks.map((link) => (
              <NavLink
                key={
                  typeof link.href === "string"
                    ? link.href
                    : `${link.href.pathname}#${"hash" in link.href ? link.href.hash ?? "" : ""}`
                }
                href={link.href}
                variant="header"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <LocaleSwitcher variant="header" />
            <ButtonLink
              href={homepageHref(homepageAnchors.contact)}
              variant="primary"
              shape="pill"
              className="min-h-11 px-5"
            >
              {t("nav.discussCta")}
            </ButtonLink>
            {whatsappUrl ? (
              <IconButton
                href={whatsappUrl}
                external
                label={t("a11y.whatsapp")}
                className="size-11 rounded-full border-border-hairline bg-bg-inset/70 hover:border-border-emphasis"
              >
                <WhatsAppIcon className="size-[1.125rem]" />
              </IconButton>
            ) : null}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher compact />
            <IconButton
              label={t("a11y.openMenu")}
              onClick={() => setMenuOpen(true)}
              className={cn(menuOpen && "pointer-events-none opacity-0")}
            >
              <Menu className="size-5" aria-hidden />
            </IconButton>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

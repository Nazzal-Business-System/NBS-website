"use client";

import type { MouseEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavLinkActive } from "@/lib/nav-active";
import {
  getHomepageSectionId,
  isHomepagePathname,
  scrollToHomepageSection,
  type AppHref,
} from "@/lib/homepage-navigation";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: AppHref;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mobile?: boolean;
  variant?: "default" | "header";
};

function hrefToComparable(href: AppHref) {
  if (typeof href === "string") return href;
  return href.hash ? `${href.pathname}#${href.hash}` : href.pathname;
}

export function NavLink({
  href,
  children,
  className,
  onClick,
  mobile = false,
  variant = "default",
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavLinkActive(pathname, hrefToComparable(href));
  const isHeader = variant === "header";
  const sectionId = getHomepageSectionId(href);
  const samePageAnchor = Boolean(sectionId && isHomepagePathname(pathname));

  const classes = cn(
    "relative inline-flex min-h-11 cursor-pointer items-center gap-1 text-sm font-medium transition-[color,background-color] duration-[var(--duration-normal)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
    mobile ? "w-full rounded-lg px-3 py-2.5" : "px-3 py-2",
    isHeader
      ? cn(
          "rounded-md text-text-secondary hover:text-text-primary",
          active && "text-text-primary",
        )
      : cn(
          "rounded-lg",
          active
            ? "bg-bg-elevated/90 text-text-primary"
            : "text-text-secondary hover:bg-bg-elevated/45 hover:text-text-primary",
          active &&
            "after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:bg-accent-violet/70",
        ),
    className,
  );

  function handleSamePageClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!sectionId) return;
    event.preventDefault();
    onClick?.();
    scrollToHomepageSection(sectionId);
  }

  if (samePageAnchor && sectionId) {
    return (
      <a
        href={`#${sectionId}`}
        className={classes}
        aria-current={active ? "page" : undefined}
        onClick={handleSamePageClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={classes}
      prefetch
    >
      {children}
    </Link>
  );
}

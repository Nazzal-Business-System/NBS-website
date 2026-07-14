"use client";

import type { MouseEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  getHomepageSectionId,
  isHomepagePathname,
  scrollToHomepageSection,
  type AppHref,
} from "@/lib/homepage-navigation";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";
type ButtonLinkShape = "default" | "pill";

type ButtonLinkProps = {
  href: AppHref;
  children: React.ReactNode;
  variant?: ButtonLinkVariant;
  shape?: ButtonLinkShape;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-accent-violet text-white hover:bg-accent-violet-hover border border-border-accent shadow-[var(--shadow-cta)] hover:-translate-y-px",
  secondary:
    "bg-bg-inset/80 text-text-primary border border-border-emphasis hover:border-border-accent hover:bg-bg-elevated hover:-translate-y-px",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary border border-transparent hover:bg-bg-elevated/35",
};

const shapeClasses: Record<ButtonLinkShape, string> = {
  default: "rounded-lg",
  pill: "rounded-full",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  shape = "default",
  className,
  external = false,
  onClick,
}: ButtonLinkProps) {
  const pathname = usePathname();
  const sectionId = getHomepageSectionId(href);
  const samePageAnchor = Boolean(sectionId && isHomepagePathname(pathname));

  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-[var(--duration-normal)] motion-reduce:transform-none active:scale-[0.99]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
    shapeClasses[shape],
    variantClasses[variant],
    className,
  );

  if (external && typeof href === "string") {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  function handleSamePageClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!sectionId) return;
    event.preventDefault();
    onClick?.();
    scrollToHomepageSection(sectionId);
  }

  if (samePageAnchor && sectionId) {
    return (
      <a href={`#${sectionId}`} className={classes} onClick={handleSamePageClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick} prefetch>
      {children}
    </Link>
  );
}

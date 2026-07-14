"use client";

import type { MouseEvent, ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  getHomepageSectionId,
  isHomepagePathname,
  scrollToHomepageSection,
  type AppHref,
} from "@/lib/homepage-navigation";

type HomeAwareLinkProps = {
  href: AppHref;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/**
 * Footer/content link that scrolls in-place on the homepage and uses the
 * locale-aware router only when leaving the current document.
 */
export function HomeAwareLink({
  href,
  className,
  children,
  onClick,
}: HomeAwareLinkProps) {
  const pathname = usePathname();
  const sectionId = getHomepageSectionId(href);
  const samePageAnchor = Boolean(sectionId && isHomepagePathname(pathname));

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
        className={className}
        onClick={handleSamePageClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} prefetch>
      {children}
    </Link>
  );
}

/**
 * Homepage section navigation helpers.
 * Same-document hashes must not go through the App Router soft navigation.
 */

export type AppHref =
  | string
  | {
      pathname: string;
      hash?: string;
      query?: Record<string, string>;
    };

export function isHomepagePathname(pathname: string | null | undefined) {
  return pathname === "/" || pathname === "";
}

/**
 * Returns a pure homepage section id when the href is a hash-only home target
 * (no search params). Query-bearing links keep router navigation.
 */
export function getHomepageSectionId(href: AppHref): string | null {
  if (typeof href === "string") {
    if (href.startsWith("#") && href.length > 1) {
      return decodeURIComponent(href.slice(1));
    }
    return null;
  }

  if (href.pathname !== "/") return null;
  if (!href.hash) return null;
  if (href.query && Object.keys(href.query).length > 0) return null;
  return href.hash;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Instant native scroll to a homepage section; updates the URL hash. */
export function scrollToHomepageSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  const nextHash = `#${sectionId}`;
  if (window.location.hash !== nextHash) {
    window.history.pushState(null, "", nextHash);
  }

  return true;
}

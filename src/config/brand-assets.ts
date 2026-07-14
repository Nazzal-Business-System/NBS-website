/**
 * Deployed brand assets mapped from logo-transparent/ (canonical sources).
 *
 * | Deployed path                         | Source (logo-transparent/)              |
 * |---------------------------------------|-----------------------------------------|
 * | /brand/nbs-mark.png                   | nbs-mark-transparent.png                |
 * | /brand/nbs-lockup.png                 | nbs-primary-transparent.png             |
 * | /brand/nbs-lockup-compact.png         | nbs-primary-compact-transparent.png     |
 * | /brand/nbs-mark-white.png             | nbs-monochrome-white-transparent.png    |
 * | /brand/nbs-mark-midnight.png          | nbs-monochrome-midnight-transparent.png |
 * | /brand/nbs-brand-pattern.svg          | nbs-brand-pattern-clean.svg             |
 * | /brand/nbs-brand-pattern-fallback.png | nbs-brand-pattern-transparent-fixed.png |
 * | /brand/nbs-app-icon-1024.png          | nbs-app-icon-1024-fixed.png             |
 * | /brand/nbs-app-icon-clean.png         | cropped (no white bars) from app icon   |
 *
 * App Router tab icons (cropped midnight square, no white bars):
 *   src/app/favicon.ico (16/32/48) · src/app/icon.png (512) · src/app/apple-icon.png (180)
 * Browsers may cache favicons — hard refresh / clear site data if an old icon persists.
 */
export const brandAssets = {
  mark: "/brand/nbs-mark.png",
  lockup: "/brand/nbs-lockup.png",
  lockupCompact: "/brand/nbs-lockup-compact.png",
  markWhite: "/brand/nbs-mark-white.png",
  markMidnight: "/brand/nbs-mark-midnight.png",
  pattern: "/brand/nbs-brand-pattern.svg",
  patternFallback: "/brand/nbs-brand-pattern-fallback.png",
  appIcon: "/brand/nbs-app-icon-1024.png",
  appIconClean: "/brand/nbs-app-icon-clean.png",
  icons: {
    appleTouch: "/brand/icons/apple-touch-icon.png",
    icon192: "/brand/icons/icon-192x192.png",
    favicon32: "/brand/icons/favicon-32x32.png",
  },
} as const;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Supported Next.js 16 setting: hide the floating Dev Tools / route indicator.
  // When a real compile or runtime error exists, Next may still surface the
  // Issues overlay entry so errors remain visible (by design).
  // Production builds never show the indicator.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);

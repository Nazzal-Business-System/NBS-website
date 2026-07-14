import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = ["", "/pricing", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}

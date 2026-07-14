import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

type MetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

function buildAlternates(path: string = "") {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return undefined;

  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}/${locale}${normalizedPath}`;
  }

  return {
    canonical: `${siteUrl}/en${normalizedPath}`,
    languages,
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
  // Index when a production site URL is configured; stay closed without it.
  noIndex = !getSiteUrl(),
}: MetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const alternates = buildAlternates(path);

  return {
    title,
    description,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates,
    openGraph: {
      type: "website",
      title,
      description,
      locale: locale === "ar" ? "ar_JO" : "en_US",
      ...(siteUrl
        ? {
            url: `${siteUrl}/${locale}${path ? (path.startsWith("/") ? path : `/${path}`) : ""}`,
          }
        : {}),
    },
    // Icons are provided by App Router file conventions:
    // src/app/favicon.ico, icon.png, apple-icon.png
  };
}

export function buildSiteMetadata({
  locale,
  title,
  description,
}: {
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  return buildPageMetadata({ locale, title, description, path: "" });
}

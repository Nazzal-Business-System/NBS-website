import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type RouteMetadataProps = {
  locale: Locale;
  namespace: string;
  path: string;
};

export async function buildRouteMetadata({
  locale,
  namespace,
  path,
}: RouteMetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: tMeta("defaultDescription"),
    path,
    noIndex: true,
  });
}

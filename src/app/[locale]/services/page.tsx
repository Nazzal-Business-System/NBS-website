import { setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/pages/placeholder-page";
import { buildRouteMetadata } from "@/lib/page-metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildRouteMetadata({
    locale: locale as Locale,
    namespace: "routes.services",
    path: "/services",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PlaceholderPage namespace="routes.services" />;
}

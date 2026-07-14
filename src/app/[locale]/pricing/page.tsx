import { setRequestLocale, getTranslations } from "next-intl/server";
import { PricingPageContent } from "@/components/pricing/pricing-page-content";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "routes.pricing" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/pricing",
    noIndex: true,
  });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricingPageContent />;
}

import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/pages/legal-document";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/terms",
    noIndex: false,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="legal.terms" />;
}

import { setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/sections/contact-section";
import { buildRouteMetadata } from "@/lib/page-metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildRouteMetadata({
    locale: locale as Locale,
    namespace: "routes.contact",
    path: "/contact",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactSection compact />;
}

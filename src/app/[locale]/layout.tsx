import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getDirection } from "@/lib/locale-utils";
import { getFontClassName, fontArabic, fontSans } from "@/lib/fonts";
import { buildSiteMetadata } from "@/lib/metadata";
import { SiteBackground } from "@/components/layout/site-background";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/navigation/site-header";
import { BackToTop } from "@/components/navigation/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildSiteMetadata({
    locale: locale as Locale,
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  });
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = getDirection(locale as Locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontSans.variable} ${fontArabic.variable} h-full`}
    >
      <body className={`min-h-full flex flex-col ${getFontClassName(locale)}`}>
        <SiteBackground />
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

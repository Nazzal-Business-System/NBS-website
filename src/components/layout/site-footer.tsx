import { getTranslations } from "next-intl/server";
import {
  homepageAnchors,
  homepageHref,
  paths,
} from "@/config/navigation";
import {
  getBusinessEmail,
  getErpDemoUrl,
  getImsDemoUrl,
  getPosDemoUrl,
  getWhatsAppUrl,
} from "@/config/site";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { HomeAwareLink } from "@/components/navigation/home-aware-link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import type { AppHref } from "@/lib/homepage-navigation";

type FooterNavItem = {
  key: string;
  label: string;
  href: AppHref;
  external?: boolean;
};

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const tA11y = await getTranslations("a11y");
  const year = new Date().getFullYear();
  const email = getBusinessEmail();
  const whatsappUrl = getWhatsAppUrl();
  const erpDemo = getErpDemoUrl();
  const posDemo = getPosDemoUrl();
  const imsDemo = getImsDemoUrl();

  const systemLinks: FooterNavItem[] = [
    {
      key: "erp",
      label: tCommon("productErp"),
      href: erpDemo ?? homepageHref(homepageAnchors.systems),
      external: Boolean(erpDemo),
    },
    {
      key: "pos",
      label: tCommon("productPos"),
      href: posDemo ?? homepageHref(homepageAnchors.pos),
      external: Boolean(posDemo),
    },
    {
      key: "ims",
      label: tCommon("productIms"),
      href: imsDemo ?? homepageHref(homepageAnchors.inventory),
      external: Boolean(imsDemo),
    },
  ];

  const companyLinks: FooterNavItem[] = [
    {
      key: "services",
      label: t("services"),
      href: homepageHref(homepageAnchors.services),
    },
    { key: "pricing", label: t("pricing"), href: paths.pricing },
    {
      key: "about",
      label: t("about"),
      href: homepageHref(homepageAnchors.about),
    },
    {
      key: "contact",
      label: t("contact"),
      href: homepageHref(homepageAnchors.contact),
    },
  ];

  const legalLinks: FooterNavItem[] = [
    { key: "privacy", label: t("privacy"), href: paths.privacy },
    { key: "terms", label: t("terms"), href: paths.terms },
  ];

  return (
    <footer className="nbs-site-footer">
      <div className="nbs-site-footer-accent" aria-hidden />

      <Container className="relative py-12 sm:py-14 lg:py-16">
        <div className="nbs-footer-cta">
          <div className="nbs-footer-cta-copy">
            <Typography
              variant="h2"
              as="p"
              className="text-[clamp(1.35rem,1.5vw+0.85rem,1.75rem)]"
            >
              {t("ctaTitle")}
            </Typography>
            <Typography variant="small" className="mt-2 max-w-xl leading-relaxed">
              {t("ctaBody")}
            </Typography>
          </div>
          <ButtonLink
            href={homepageHref(homepageAnchors.contact)}
            variant="primary"
            shape="pill"
            className="shrink-0 px-7 py-3"
          >
            {t("ctaButton")}
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-10 border-t border-border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <BrandLockup ariaLabel={tA11y("homeLink")} />
            <Typography variant="small" className="max-w-sm leading-relaxed">
              {t("descriptor")}
            </Typography>
            <p className="text-sm text-text-muted">{t("location")}</p>
            <div className="mt-1 flex flex-col gap-1.5">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="nbs-footer-link"
                  dir="ltr"
                >
                  <span className="text-text-muted">{t("emailLabel")}: </span>
                  {email}
                </a>
              ) : null}
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  className="nbs-footer-link inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-3.5" />
                  {tA11y("whatsapp")}
                </a>
              ) : null}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label={t("systems")}>
            <p className="nbs-footer-heading">{t("systems")}</p>
            <p className="mb-3 text-xs text-text-muted">{t("systemsNote")}</p>
            <ul className="flex flex-col gap-1">
              {systemLinks.map((link) => (
                <li key={link.key}>
                  <FooterItem link={link} />
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={t("company")}>
            <p className="nbs-footer-heading">{t("company")}</p>
            <ul className="flex flex-col gap-1">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <FooterItem link={link} />
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={t("legal")}>
            <p className="nbs-footer-heading">{t("legal")}</p>
            <ul className="flex flex-col gap-1">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <FooterItem link={link} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <LocaleSwitcher showLabel />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Typography variant="caption">{t("copyright", { year })}</Typography>
          <Typography variant="caption">{t("location")}</Typography>
        </div>
      </Container>
    </footer>
  );
}

function FooterItem({ link }: { link: FooterNavItem }) {
  if (link.external && typeof link.href === "string") {
    return (
      <a
        href={link.href}
        className="nbs-footer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    );
  }

  return (
    <HomeAwareLink href={link.href} className="nbs-footer-link">
      {link.label}
    </HomeAwareLink>
  );
}

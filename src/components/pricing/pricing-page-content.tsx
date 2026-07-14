import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  homepageAnchors,
  homepageHref,
} from "@/config/navigation";
import {
  homepagePricingProducts,
  pricingAddOns,
  pricingComparisonPackageIds,
  pricingDetailSections,
  pricingExclusionIds,
  pricingFactorIds,
  pricingFaqIds,
  type PricingAccent,
  type PricingProductId,
} from "@/config/pricing";
import { getWhatsAppUrl } from "@/config/site";
import {
  formatPricingQuote,
  formatPricingQuoteLine,
} from "@/lib/pricing-format";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Typography } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { PricingStickyNav } from "@/components/pricing/pricing-sticky-nav";
import { cn } from "@/lib/cn";

const accentClass: Record<PricingAccent, string> = {
  cobalt: "nbs-pricing-detail--cobalt",
  violet: "nbs-pricing-detail--violet",
  cyan: "nbs-pricing-detail--cyan",
  emerald: "nbs-pricing-detail--emerald",
};

export async function PricingPageContent() {
  const t = await getTranslations("pricing");
  const whatsappUrl = getWhatsAppUrl();

  const quoteLabels = {
    startingFrom: t("shared.startingFrom"),
    afterScope: t("shared.afterScope"),
    separately: t("shared.separately"),
    perMonth: t("shared.perMonth"),
  };

  const heroTitleId = "pricing-page-title";
  const productsTitleId = "pricing-products-title";
  const comparisonTitleId = "pricing-comparison-title";
  const addOnsTitleId = "pricing-addons-title";
  const factorsTitleId = "pricing-factors-title";
  const exclusionsTitleId = "pricing-exclusions-title";
  const faqTitleId = "pricing-faq-title";
  const ctaTitleId = "pricing-cta-title";

  const stickyLabels = {
    erp: t("products.erp.name"),
    pos: t("products.pos.name"),
    ims: t("products.ims.name"),
    custom: t("products.custom.shortName"),
    addons: t("page.navAddons"),
  };

  const faqItems = pricingFaqIds.map((id) => ({
    id,
    question: t(`faq.${id}.question`),
    answer: t(`faq.${id}.answer`),
    anchorId: `pricing-faq-${id}`,
  }));

  return (
    <>
      <Section
        variant="base"
        padding="default"
        className="nbs-pricing-hero"
        aria-labelledby={heroTitleId}
      >
        <Reveal>
          <div className="nbs-pricing-hero-inner">
            <SectionHeading
              eyebrow={t("page.eyebrow")}
              title={t("page.title")}
              description={t("page.description")}
              titleId={heroTitleId}
            />
            <Typography
              variant="body"
              className="mt-6 max-w-2xl text-text-secondary"
            >
              {t("shared.disclaimer")}
            </Typography>
            <Typography
              variant="small"
              className="mt-3 max-w-2xl text-text-muted"
            >
              {t("shared.bilingualIncluded")}
            </Typography>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={homepageHref(homepageAnchors.contact)}
                variant="primary"
                shape="pill"
                className="px-7 py-3"
              >
                {t("shared.discussCta")}
              </ButtonLink>
              <a href="#pricing-erp" className="nbs-pricing-browse-link">
                {t("page.browsePackages")}
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      <PricingStickyNav
        labels={stickyLabels}
        ariaLabel={t("page.jumpLabel")}
        selectLabel={t("page.navSelectLabel")}
      />

      <Section
        id="comparison"
        variant="subtle"
        divider
        aria-labelledby={comparisonTitleId}
      >
        <Reveal>
          <SectionHeading
            eyebrow={t("page.comparisonEyebrow")}
            title={t("page.comparisonTitle")}
            description={t("page.comparisonDescription")}
            titleId={comparisonTitleId}
          />
        </Reveal>
        <Reveal delay={70}>
          <ul className="nbs-pricing-comparison mt-8 list-none sm:mt-10">
            {homepagePricingProducts.map((product) => {
              const pkgId =
                pricingComparisonPackageIds[product.id as PricingProductId];
              const section = pricingDetailSections.find(
                (s) => s.id === product.id,
              );
              const pkg = section?.packages.find((p) => p.id === pkgId);
              const formatted = formatPricingQuote(
                pkg?.quote ?? product.starting,
                quoteLabels,
              );
              const priceLine = formatted.secondary
                ? `${formatted.secondary} ${formatted.primary}`
                : formatted.primary;

              return (
                <li key={product.id} className="nbs-pricing-comparison-row">
                  <div className="min-w-0">
                    <Typography
                      variant="h3"
                      as="h3"
                      className="text-base sm:text-lg"
                    >
                      {t(`products.${product.id}.name`)}
                    </Typography>
                    <Typography
                      variant="small"
                      className="mt-1 text-text-secondary"
                    >
                      {t(`products.${product.id}.packages.${pkgId}.name`)}
                    </Typography>
                  </div>
                  <p className="nbs-pricing-comparison-price" dir="ltr">
                    {priceLine}
                  </p>
                  <a
                    href={`#pricing-${product.id}`}
                    className="nbs-pricing-jump-link"
                  >
                    {t("homepage.viewDetails")}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Section>

      <Section
        id="products"
        variant="base"
        divider
        aria-labelledby={productsTitleId}
      >
        <Reveal>
          <SectionHeading
            eyebrow={t("page.productsEyebrow")}
            title={t("page.productsTitle")}
            description={t("page.productsDescription")}
            titleId={productsTitleId}
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-16 lg:gap-20">
          {pricingDetailSections.map((section, sectionIndex) => (
            <Reveal key={section.id} delay={sectionIndex * 30}>
              <article
                id={`pricing-${section.id}`}
                className={cn(
                  "nbs-pricing-detail",
                  accentClass[section.accent],
                )}
              >
                <header className="nbs-pricing-detail-header">
                  <Eyebrow className="nbs-pricing-detail-eyebrow">
                    {t(`products.${section.id}.name`)}
                  </Eyebrow>
                  <Typography
                    variant="h2"
                    as="h3"
                    className="mt-3 text-2xl sm:text-3xl"
                  >
                    {t(`products.${section.id}.detailTitle`)}
                  </Typography>
                  <Typography
                    variant="bodyLarge"
                    className="mt-4 max-w-2xl text-text-secondary"
                  >
                    {t(`products.${section.id}.detailDescription`)}
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-3 max-w-2xl text-text-muted"
                  >
                    {t(`products.${section.id}.idealFor`)}
                  </Typography>
                </header>

                <ul className="nbs-pricing-package-grid mt-10 list-none">
                  {section.packages.map((pkg) => {
                    const formatted = formatPricingQuote(
                      pkg.quote,
                      quoteLabels,
                    );
                    return (
                      <li key={pkg.id} className="nbs-pricing-package">
                        <div className="nbs-pricing-package-inner">
                          <div className="nbs-pricing-package-head">
                            <Typography
                              variant="h3"
                              as="h3"
                              className="text-lg sm:text-xl"
                            >
                              {t(
                                `products.${section.id}.packages.${pkg.id}.name`,
                              )}
                            </Typography>
                            <div className="nbs-pricing-package-price">
                              {formatted.secondary ? (
                                <span className="nbs-pricing-card-price-label">
                                  {formatted.secondary}
                                </span>
                              ) : null}
                              <span
                                className="nbs-pricing-card-price-value"
                                dir="ltr"
                              >
                                {formatted.primary}
                              </span>
                            </div>
                          </div>

                          <Typography
                            variant="small"
                            className="mt-4 leading-relaxed text-text-secondary"
                          >
                            {t(
                              `products.${section.id}.packages.${pkg.id}.description`,
                            )}
                          </Typography>

                          <ul className="nbs-pricing-card-features mt-5 list-none">
                            {pkg.includeIds.map((includeId) => (
                              <li
                                key={includeId}
                                className="nbs-pricing-card-feature"
                              >
                                <Check
                                  className="nbs-pricing-card-check size-3.5 shrink-0"
                                  strokeWidth={2.5}
                                  aria-hidden
                                />
                                <span>
                                  {t(
                                    `products.${section.id}.packages.${pkg.id}.includes.${includeId}`,
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="nbs-pricing-package-cta">
                          <ButtonLink
                            href={homepageHref(homepageAnchors.contact)}
                            variant="secondary"
                            shape="pill"
                            className="w-full px-5 py-2.5"
                          >
                            {t("shared.requestQuoteCta")}
                          </ButtonLink>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="add-ons"
        variant="subtle"
        divider
        aria-labelledby={addOnsTitleId}
      >
        <Reveal>
          <SectionHeading
            eyebrow={t("page.addonsEyebrow")}
            title={t("page.addonsTitle")}
            description={t("page.addonsDescription")}
            titleId={addOnsTitleId}
          />
        </Reveal>

        <Reveal delay={70}>
          <ul className="nbs-pricing-addon-grid mt-10 list-none">
            {pricingAddOns.map((addon) => (
                <li key={addon.id} className="nbs-pricing-addon-card">
                  <Typography
                    variant="h3"
                    as="h3"
                    className="nbs-pricing-addon-card-title text-base leading-snug sm:text-lg"
                  >
                    {t(`addons.${addon.id}.name`)}
                  </Typography>
                  <Typography
                    variant="small"
                    className="nbs-pricing-addon-card-desc mt-2 leading-relaxed text-text-secondary"
                  >
                    {t(`addons.${addon.id}.description`)}
                  </Typography>
                  <p className="nbs-pricing-addon-card-price" dir="ltr">
                    {formatPricingQuoteLine(addon.quote, quoteLabels)}
                  </p>
                </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        id="factors"
        variant="base"
        divider
        aria-labelledby={factorsTitleId}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow={t("page.factorsEyebrow")}
                title={t("page.factorsTitle")}
                description={t("page.factorsDescription")}
                titleId={factorsTitleId}
              />
            </Reveal>
            <Reveal delay={70}>
              <ul className="nbs-pricing-factors mt-8 list-none">
                {pricingFactorIds.map((factorId) => (
                  <li key={factorId} className="nbs-pricing-factor">
                    <Check
                      className="size-4 shrink-0 text-accent-cobalt"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <Typography variant="body" className="text-text-secondary">
                      {t(`factors.${factorId}`)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div id="exclusions" aria-labelledby={exclusionsTitleId}>
            <Reveal delay={40}>
              <SectionHeading
                eyebrow={t("page.exclusionsEyebrow")}
                title={t("page.exclusionsTitle")}
                description={t("page.exclusionsDescription")}
                titleId={exclusionsTitleId}
              />
            </Reveal>
            <Reveal delay={90}>
              <ul className="nbs-pricing-exclusions mt-8 list-none">
                {pricingExclusionIds.map((id) => (
                  <li key={id} className="nbs-pricing-exclusion">
                    <Typography variant="body" className="text-text-secondary">
                      {t(`exclusions.${id}`)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="faq" variant="subtle" divider aria-labelledby={faqTitleId}>
        <Reveal>
          <SectionHeading
            eyebrow={t("page.faqEyebrow")}
            title={t("page.faqTitle")}
            description={t("page.faqDescription")}
            titleId={faqTitleId}
          />
        </Reveal>
        <Reveal delay={70}>
          <FaqAccordion items={faqItems} className="mt-10" />
        </Reveal>
      </Section>

      <Section
        id="get-started"
        variant="emphasis"
        divider
        aria-labelledby={ctaTitleId}
      >
        <Reveal>
          <div className="nbs-pricing-cta">
            <Eyebrow>{t("page.ctaEyebrow")}</Eyebrow>
            <Typography
              variant="h2"
              as="h2"
              id={ctaTitleId}
              className="mt-3 max-w-2xl"
            >
              {t("page.ctaTitle")}
            </Typography>
            <Typography
              variant="bodyLarge"
              className="mt-4 max-w-xl text-text-secondary"
            >
              {t("page.ctaDescription")}
            </Typography>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={homepageHref(homepageAnchors.contact)}
                variant="primary"
                shape="pill"
                className="px-7 py-3"
              >
                {t("shared.discussCta")}
              </ButtonLink>
              <ButtonLink
                href={{
                  pathname: "/",
                  hash: homepageAnchors.contact,
                  query: { intent: "quotation" },
                }}
                variant="secondary"
                shape="pill"
                className="px-7 py-3"
              >
                {t("shared.requestQuoteCta")}
              </ButtonLink>
              {whatsappUrl ? (
                <ButtonLink
                  href={whatsappUrl}
                  variant="ghost"
                  shape="pill"
                  className="px-7 py-3"
                  external
                >
                  <span className="inline-flex items-center gap-2">
                    <WhatsAppIcon className="size-4" />
                    {t("shared.whatsappCta")}
                  </span>
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

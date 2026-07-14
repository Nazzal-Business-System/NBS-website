import { getTranslations } from "next-intl/server";
import {
  homepageAnchors,
  homepageHref,
  homepageSectionIds,
  paths,
} from "@/config/navigation";
import { homepagePricingProducts } from "@/config/pricing";
import { formatPricingQuote } from "@/lib/pricing-format";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Typography } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { PricingPreviewCard } from "@/components/pricing/pricing-preview-card";

export async function PricingSection() {
  const t = await getTranslations("pricing");
  const titleId = `${homepageSectionIds.pricing}-title`;

  const quoteLabels = {
    startingFrom: t("shared.startingFrom"),
    afterScope: t("shared.afterScope"),
    separately: t("shared.separately"),
    perMonth: t("shared.perMonth"),
  };

  return (
    <Section
      id={homepageSectionIds.pricing}
      variant="subtle"
      divider
      aria-labelledby={titleId}
    >
      <div className="flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <Reveal>
            <SectionHeading
              eyebrow={t("homepage.eyebrow")}
              title={t("homepage.title")}
              description={t("homepage.description")}
              titleId={titleId}
            />
          </Reveal>
          <Reveal delay={60}>
            <ButtonLink
              href={paths.pricing}
              variant="secondary"
              shape="pill"
              className="shrink-0 px-6 py-3"
            >
              {t("homepage.viewFull")}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="nbs-pricing-preview-grid">
            {homepagePricingProducts.map((product) => {
              const formatted = formatPricingQuote(product.starting, quoteLabels);
              const features = product.featureIds.map((featureId) =>
                t(`products.${product.id}.features.${featureId}`),
              );

              return (
                <PricingPreviewCard
                  key={product.id}
                  accent={product.accent}
                  name={t(`products.${product.id}.name`)}
                  idealFor={t(`products.${product.id}.idealFor`)}
                  priceSecondary={formatted.secondary}
                  pricePrimary={formatted.primary}
                  features={features}
                  detailsLabel={t("homepage.viewDetails")}
                  discussLabel={t("shared.discussCta")}
                  showDiscuss={product.showDiscussCta}
                />
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={110}>
          <Typography
            variant="small"
            className="max-w-3xl text-text-muted leading-relaxed"
          >
            {t("shared.disclaimer")}
          </Typography>
        </Reveal>

        <Reveal delay={130}>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              href={homepageHref(homepageAnchors.contact)}
              variant="primary"
              shape="pill"
              className="px-7 py-3"
            >
              {t("shared.discussCta")}
            </ButtonLink>
            <ButtonLink
              href={paths.pricing}
              variant="ghost"
              shape="pill"
              className="px-5 py-3"
            >
              {t("homepage.viewFull")}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import {
  Boxes,
  LayoutDashboard,
  Plug,
  ShoppingCart,
  Warehouse,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  homepageAnchors,
  homepageHref,
  homepageSectionIds,
} from "@/config/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Typography } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

const serviceKeys = [
  "custom",
  "erp",
  "pos",
  "inventory",
  "dashboards",
  "integrations",
] as const;

const serviceIcons: Record<(typeof serviceKeys)[number], LucideIcon> = {
  custom: Workflow,
  erp: Boxes,
  pos: ShoppingCart,
  inventory: Warehouse,
  dashboards: LayoutDashboard,
  integrations: Plug,
};

export async function ServicesSection() {
  const t = await getTranslations("homepage.services");
  const titleId = `${homepageSectionIds.services}-title`;

  return (
    <Section
      id={homepageSectionIds.services}
      variant="base"
      divider
      aria-labelledby={titleId}
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-16">
        <div className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              titleId={titleId}
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink
                href={homepageHref(homepageAnchors.contact)}
                variant="primary"
                shape="pill"
                className="px-6 py-3"
              >
                {t("primaryCta")}
              </ButtonLink>
              <ButtonLink
                href={homepageHref(homepageSectionIds.process)}
                variant="secondary"
                shape="pill"
                className="px-6 py-3"
              >
                {t("secondaryCta")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ul className="nbs-services-list list-none">
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[key];
              return (
                <li key={key}>
                  <article className="nbs-services-row group">
                    <span className="nbs-services-index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="nbs-services-icon" aria-hidden>
                      <Icon className="size-[1.125rem]" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <Typography
                        variant="h3"
                        as="h3"
                        className="text-base leading-snug sm:text-lg"
                      >
                        {t(`items.${key}.title`)}
                      </Typography>
                      <Typography
                        variant="small"
                        className="mt-1.5 max-w-xl leading-relaxed"
                      >
                        {t(`items.${key}.description`)}
                      </Typography>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

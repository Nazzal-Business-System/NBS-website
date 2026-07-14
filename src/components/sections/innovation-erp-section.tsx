import { Check } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { homepageSectionIds } from "@/config/navigation";
import { getErpMediaSources } from "@/config/media-assets";
import { getErpDemoUrl } from "@/config/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { ProductVideoStage } from "@/components/media/product-video-stage";
import { DemoAction } from "./demo-action";
import type { Locale } from "@/i18n/routing";

const capabilityKeys = ["connected", "roles", "visibility", "bilingual"] as const;

export async function InnovationErpSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("homepage.innovationErp");
  const media = getErpMediaSources(locale);
  const titleId = `${homepageSectionIds.innovationErp}-title`;
  const demoUrl = getErpDemoUrl();

  return (
    <Section
      id={homepageSectionIds.innovationErp}
      variant="subtle"
      divider
      aria-labelledby={titleId}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <div className="flex flex-col gap-7 lg:gap-8">
          <Reveal>
            <div className="max-w-xl lg:max-w-none">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <Typography variant="h2" as="h2" id={titleId}>
                {t("title")}
              </Typography>
              <Typography variant="bodyLarge" className="mt-4 max-w-lg">
                {t("description")}
              </Typography>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="grid max-w-xl list-none gap-3 sm:gap-3.5">
              {capabilityKeys.map((key) => (
                <li key={key} className="flex gap-3">
                  <span
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-border-hairline bg-bg-inset/70 text-accent-cobalt"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  <Typography variant="body" className="text-text-secondary">
                    {t(`capabilities.${key}`)}
                  </Typography>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <DemoAction
              demoUrl={demoUrl}
              contactProduct="innovation-erp"
              openLabel={t("demoOpenCta")}
              requestLabel={t("secondaryCta")}
              comingSoonLabel={t("demoComingSoon")}
            />
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ProductVideoStage
            poster={media.poster}
            webm={media.webm}
            mp4={media.mp4}
            caption={t("mediaCaption")}
            playLabel={t("playLabel")}
            unavailableLabel={t("mediaUnavailable")}
            playbackEnabled={media.playbackEnabled}
          />
        </Reveal>
      </div>
    </Section>
  );
}

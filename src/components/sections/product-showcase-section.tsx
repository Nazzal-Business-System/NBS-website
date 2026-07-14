import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ProductMediaSources } from "@/config/media-assets";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { ProductVideoStage } from "@/components/media/product-video-stage";
import { DemoAction } from "./demo-action";
import { cn } from "@/lib/cn";

export type ProductAccent = "cobalt" | "violet" | "cyan";
export type ProductMediaScale = "flagship" | "standard";

type SectionVariant = "base" | "subtle" | "elevated" | "emphasis";

type ProductShowcaseSectionProps = {
  id: string;
  titleId: string;
  translationNamespace: string;
  capabilityKeys: readonly string[];
  media: ProductMediaSources;
  contactProduct: string;
  demoUrl?: string;
  mediaFirst: boolean;
  accent: ProductAccent;
  mediaScale?: ProductMediaScale;
  variant?: SectionVariant;
};

const accentEyebrowClass: Record<ProductAccent, string> = {
  cobalt: "text-accent-cobalt",
  violet: "text-accent-violet",
  cyan: "text-accent-cyan",
};

const accentIconClass: Record<ProductAccent, string> = {
  cobalt: "text-accent-cobalt",
  violet: "text-accent-violet",
  cyan: "text-accent-cyan",
};

const accentFrameClass: Record<ProductAccent, string> = {
  cobalt: "nbs-product-media--cobalt",
  violet: "nbs-product-media--violet",
  cyan: "nbs-product-media--cyan",
};

export async function ProductShowcaseSection({
  id,
  titleId,
  translationNamespace,
  capabilityKeys,
  media,
  contactProduct,
  demoUrl,
  mediaFirst,
  accent,
  mediaScale = "flagship",
  variant = "subtle",
}: ProductShowcaseSectionProps) {
  const t = await getTranslations(translationNamespace);

  const content = (
    <div className="flex flex-col gap-6 lg:gap-7">
      <Reveal>
        <div className="max-w-xl lg:max-w-none">
          <p
            className={cn(
              "mb-3 text-xs font-medium uppercase tracking-[0.14em]",
              accentEyebrowClass[accent],
            )}
          >
            {t("eyebrow")}
          </p>
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
                className={cn(
                  "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-border-hairline bg-bg-inset/70",
                  accentIconClass[accent],
                )}
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
          contactProduct={contactProduct}
          openLabel={t("demoOpenCta")}
          requestLabel={t("secondaryCta")}
          comingSoonLabel={t("demoComingSoon")}
        />
      </Reveal>
    </div>
  );

  const mediaStage = (
    <Reveal delay={100}>
      <ProductVideoStage
        poster={media.poster}
        webm={media.webm}
        mp4={media.mp4}
        caption={t("mediaCaption")}
        playLabel={t("playLabel")}
        unavailableLabel={t("mediaUnavailable")}
        playbackEnabled={media.playbackEnabled}
        accent={accent}
        scale={mediaScale}
        className={accent !== "cobalt" ? accentFrameClass[accent] : undefined}
      />
    </Reveal>
  );

  return (
    <Section id={id} variant={variant} divider aria-labelledby={titleId}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        {mediaFirst ? (
          <>
            {mediaStage}
            {content}
          </>
        ) : (
          <>
            {content}
            {mediaStage}
          </>
        )}
      </div>
    </Section>
  );
}

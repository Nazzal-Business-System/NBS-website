import { getTranslations } from "next-intl/server";
import {
  homepageAnchors,
  homepageHref,
  homepageSectionIds,
} from "@/config/navigation";
import { getPortfolioUrl, getWhatsAppUrl } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { FadeImage } from "@/components/media/fade-image";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const principleKeys = ["understand", "practical", "growth"] as const;
const founderPortraitSrc = "/media/founder/founder-portrait.png";

export async function FounderConsultationSection() {
  const t = await getTranslations("homepage.founder");
  const tCta = await getTranslations("homepage.consultation");
  const founderTitleId = `${homepageSectionIds.founder}-title`;
  const consultationTitleId = `${homepageSectionIds.consultation}-title`;
  const whatsappUrl = getWhatsAppUrl();
  const portfolioUrl = getPortfolioUrl();

  return (
    <>
      <Section
        id={homepageSectionIds.founder}
        variant="base"
        divider
        aria-labelledby={founderTitleId}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <div className="flex max-w-2xl flex-col gap-8 lg:max-w-none">
            <Reveal>
              <div>
                <Eyebrow className="text-accent-violet">{t("eyebrow")}</Eyebrow>
                <Typography
                  variant="h2"
                  as="h2"
                  id={founderTitleId}
                  className="max-w-[18ch] text-[clamp(1.75rem,2.5vw+0.75rem,2.5rem)] leading-[1.15]"
                >
                  {t("title")}
                </Typography>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="flex flex-col gap-4">
                <Typography variant="bodyLarge" className="max-w-xl">
                  {t("story.lead")}
                </Typography>
                <Typography variant="body" className="max-w-xl">
                  {t("story.body")}
                </Typography>
                <Typography variant="body" className="max-w-xl">
                  {t("story.close")}
                </Typography>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="nbs-founder-principles list-none">
                {principleKeys.map((key) => (
                  <li key={key} className="nbs-founder-principle">
                    <span className="nbs-founder-principle-mark" aria-hidden />
                    <Typography variant="body" className="text-text-primary">
                      {t(`principles.${key}`)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex flex-col gap-4">
                <p className="nbs-founder-attribution">
                  <span className="text-text-primary">{t("attribution.name")}</span>
                  <span className="text-text-muted" aria-hidden>
                    {" · "}
                  </span>
                  <span className="text-text-muted">{t("attribution.role")}</span>
                </p>
                <div>
                  {portfolioUrl ? (
                    <ButtonLink
                      href={portfolioUrl}
                      variant="secondary"
                      shape="pill"
                      className="px-6 py-3"
                      external
                    >
                      {t("portfolioCta")}
                    </ButtonLink>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      shape="pill"
                      className="px-6 py-3"
                      disabled
                      aria-disabled="true"
                    >
                      {t("portfolioComingSoon")}
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={90}>
            <figure className="nbs-founder-portrait">
              <div className="nbs-founder-portrait-frame">
                <div className="nbs-founder-portrait-surface">
                  <FadeImage
                    src={founderPortraitSrc}
                    alt={t("portraitAlt")}
                    fill
                    sizes="(min-width: 1024px) 34vw, 88vw"
                    className="nbs-founder-portrait-image"
                    wrapperClassName="absolute inset-0"
                    skeletonClassName="absolute inset-0"
                    errorLabel={t("portraitUnavailable")}
                    priority={false}
                  />
                </div>
              </div>
              <figcaption className="nbs-founder-portrait-caption">
                {t("portraitCaption")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section
        id={homepageSectionIds.consultation}
        variant="emphasis"
        divider
        aria-labelledby={consultationTitleId}
        className="nbs-consultation-band"
      >
        <Reveal>
          <div className="nbs-consultation-inner mx-auto flex max-w-3xl flex-col items-start text-start sm:items-center sm:text-center">
            <Typography
              variant="h2"
              as="h2"
              id={consultationTitleId}
              className="max-w-[22ch] text-[clamp(1.625rem,2.2vw+0.75rem,2.25rem)] leading-[1.18]"
            >
              {tCta("title")}
            </Typography>
            <Typography
              variant="bodyLarge"
              className="mt-5 max-w-xl sm:mx-auto"
            >
              {tCta("description")}
            </Typography>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3.5">
              <ButtonLink
                href={homepageHref(homepageAnchors.contact)}
                variant="primary"
                shape="pill"
                className="px-7 py-3"
              >
                {tCta("primaryCta")}
              </ButtonLink>
              {whatsappUrl ? (
                <ButtonLink
                  href={whatsappUrl}
                  variant="secondary"
                  shape="pill"
                  className="gap-2 px-7 py-3"
                  external
                >
                  <WhatsAppIcon className="size-4" />
                  {tCta("secondaryCta")}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

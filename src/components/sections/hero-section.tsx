import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import {
  homepageAnchors,
  homepageHref,
  homepageSectionIds,
} from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroVisualStage } from "./hero-visual-stage";
import { ProofStrip } from "./proof-strip";

export async function HeroSection() {
  const t = await getTranslations("homepage.hero");
  const exploreHref = homepageHref(homepageSectionIds.innovationErp);
  const contactHref = homepageHref(homepageAnchors.contact);

  return (
    <section
      id={homepageSectionIds.hero}
      className="nbs-hero-shell"
      aria-labelledby="hero-headline"
    >
      <div className="nbs-hero-blueprint" aria-hidden />
      <div className="nbs-hero-ambient" aria-hidden />

      <Container className="relative z-[1] pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-14 lg:pb-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex max-w-xl flex-col gap-6 lg:max-w-none lg:gap-7 xl:gap-8">
            <Reveal>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent-violet sm:text-xs">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id="hero-headline"
                className="text-[clamp(2.125rem,4.8vw+0.5rem,3.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-text-primary"
              >
                {t("headline")}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-relaxed">
                {t("supporting")}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink
                  href={contactHref}
                  variant="primary"
                  shape="pill"
                  className="gap-2 px-6 py-3 text-sm sm:px-7"
                >
                  {t("primaryCta")}
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </ButtonLink>
                <ButtonLink
                  href={exploreHref}
                  variant="secondary"
                  shape="pill"
                  className="px-6 py-3 text-sm sm:px-7"
                >
                  {t("secondaryCta")}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="w-full lg:justify-self-stretch">
            <HeroVisualStage />
          </Reveal>
        </div>
      </Container>

      <ProofStrip embedded />
    </section>
  );
}

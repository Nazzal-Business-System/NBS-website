import { getTranslations } from "next-intl/server";
import { homepageSectionIds } from "@/config/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Typography } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";

const stepKeys = [
  "understand",
  "scope",
  "build",
  "test",
  "deploy",
] as const;

export async function ProcessSection() {
  const t = await getTranslations("homepage.process");
  const titleId = `${homepageSectionIds.process}-title`;

  return (
    <Section
      id={homepageSectionIds.process}
      variant="subtle"
      divider
      aria-labelledby={titleId}
    >
      <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            titleId={titleId}
          />
        </Reveal>

        <ol className="nbs-process-rail list-none">
          {stepKeys.map((key, index) => (
            <li key={key} className="nbs-process-step">
              <Reveal delay={60 + index * 55} className="h-full">
                <article className="nbs-process-card group h-full">
                  <span className="nbs-process-number" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Typography
                    variant="h3"
                    as="h3"
                    className="mt-4 text-base leading-snug sm:text-lg"
                  >
                    {t(`steps.${key}.title`)}
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-2.5 leading-relaxed"
                  >
                    {t(`steps.${key}.description`)}
                  </Typography>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

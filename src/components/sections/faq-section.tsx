import { getTranslations } from "next-intl/server";
import { homepageSectionIds } from "@/config/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/ui/faq-accordion";

const faqKeys = [
  "customVsReady",
  "demoAccess",
  "customization",
  "language",
  "processTimeline",
  "pricing",
  "support",
  "location",
] as const;

export async function FaqSection() {
  const t = await getTranslations("homepage.faq");
  const titleId = `${homepageSectionIds.faq}-title`;

  const items = faqKeys.map((key) => ({
    id: key,
    anchorId: key === "pricing" ? "faq-pricing" : `faq-${key}`,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <Section
      id={homepageSectionIds.faq}
      variant="subtle"
      divider
      aria-labelledby={titleId}
    >
      <div className="flex flex-col gap-10 lg:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            titleId={titleId}
          />
        </Reveal>

        <Reveal delay={80}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}

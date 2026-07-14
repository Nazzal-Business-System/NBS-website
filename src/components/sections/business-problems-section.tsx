import {
  EyeOff,
  LineChart,
  Puzzle,
  Table2,
  Unlink2,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { homepageSectionIds } from "@/config/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProblemCard } from "./problem-card";

const problemKeys = [
  "scattered",
  "manual",
  "visibility",
  "disconnected",
  "decisions",
  "mismatch",
] as const;

const problemIcons = {
  scattered: Table2,
  manual: Workflow,
  visibility: EyeOff,
  disconnected: Unlink2,
  decisions: LineChart,
  mismatch: Puzzle,
} as const;

export async function BusinessProblemsSection() {
  const t = await getTranslations("homepage.problems");
  const titleId = `${homepageSectionIds.problems}-title`;

  return (
    <Section
      id={homepageSectionIds.problems}
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

        <Reveal delay={60}>
          <ul className="nbs-problem-grid grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {problemKeys.map((key) => {
              const Icon = problemIcons[key];
              return (
                <li key={key} className="contents">
                  <ProblemCard
                    icon={Icon}
                    title={t(`items.${key}.title`)}
                    description={t(`items.${key}.description`)}
                  />
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

import { getTranslations } from "next-intl/server";
import {
  Code2,
  Languages,
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";
import { homepageSectionIds } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const proofItemKeys = [
  "customSoftware",
  "innovationErp",
  "pos",
  "inventory",
  "bilingual",
  "founder",
] as const;

const proofIcons = {
  customSoftware: Code2,
  innovationErp: LayoutDashboard,
  pos: ShoppingCart,
  inventory: Package,
  bilingual: Languages,
  founder: User,
} as const;

type ProofStripProps = {
  embedded?: boolean;
};

export async function ProofStrip({ embedded = false }: ProofStripProps) {
  const t = await getTranslations("homepage.proofStrip");

  return (
    <section
      id={homepageSectionIds.proof}
      aria-labelledby="proof-strip-heading"
      className={cn(
        "relative z-[1]",
        embedded
          ? "border-t border-border-hairline/70 bg-transparent py-8 sm:py-10"
          : "border-y border-border-hairline bg-bg-subtle/60 py-5 sm:py-6",
      )}
    >
      <Container>
        <h2 id="proof-strip-heading" className="sr-only">
          {t("title")}
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-4">
          {proofItemKeys.map((key) => {
            const Icon = proofIcons[key];
            return (
              <li
                key={key}
                className="flex flex-col items-center gap-2.5 text-center lg:flex-1"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border-hairline bg-bg-elevated/50 text-accent-violet">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="max-w-[9rem] text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                  {t(`items.${key}`)}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

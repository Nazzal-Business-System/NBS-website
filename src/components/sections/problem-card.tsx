import type { LucideIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

type ProblemCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function ProblemCard({
  icon: Icon,
  title,
  description,
  className,
}: ProblemCardProps) {
  return (
    <article
      className={cn(
        "nbs-problem-card group row-span-3 grid h-full grid-rows-subgrid rounded-xl border border-border-hairline bg-bg-elevated/25 p-5 sm:p-6",
        "transition-[border-color,background-color,transform] duration-[var(--duration-normal)]",
        "hover:border-border-emphasis hover:bg-bg-elevated/45 motion-safe:hover:-translate-y-px",
        className,
      )}
    >
      <span
        className="inline-flex size-10 shrink-0 items-center justify-center self-start rounded-lg border border-border-hairline bg-bg-inset/80 text-accent-violet transition-colors duration-[var(--duration-normal)] group-hover:border-border-accent/60"
        aria-hidden
      >
        <Icon className="size-[1.125rem]" strokeWidth={1.75} />
      </span>
      <Typography
        variant="h3"
        as="h3"
        className="self-start pt-4 text-base leading-snug sm:text-lg"
      >
        {title}
      </Typography>
      <Typography variant="small" className="self-start pt-2.5 leading-relaxed">
        {description}
      </Typography>
    </article>
  );
}

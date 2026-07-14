import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
};

const roundedClass = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

/** Pure CSS skeleton block — no artificial delay. */
export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={cn("nbs-skeleton", roundedClass[rounded], className)}
      aria-hidden
    />
  );
}

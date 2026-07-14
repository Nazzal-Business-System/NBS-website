import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-medium uppercase tracking-[0.14em] text-accent-cobalt",
        className,
      )}
    >
      {children}
    </p>
  );
}

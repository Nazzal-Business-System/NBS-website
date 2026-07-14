import { cn } from "@/lib/cn";

type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyLarge"
  | "small"
  | "caption";

const variantClasses: Record<TypographyVariant, string> = {
  display:
    "text-[clamp(2rem,4vw+1rem,3.25rem)] font-semibold leading-[1.1] tracking-tight text-text-primary",
  h1: "text-[clamp(1.75rem,3vw+0.5rem,2.5rem)] font-semibold leading-tight tracking-tight text-text-primary",
  h2: "text-[clamp(1.375rem,2vw+0.5rem,1.875rem)] font-semibold leading-snug text-text-primary",
  h3: "text-lg font-medium leading-snug text-text-primary",
  body: "text-base leading-relaxed text-text-secondary",
  bodyLarge: "text-lg leading-relaxed text-text-secondary",
  small: "text-sm leading-normal text-text-muted",
  caption: "text-xs leading-normal text-text-muted",
};

type TypographyProps = {
  variant: TypographyVariant;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Typography({
  variant,
  as,
  children,
  className,
  id,
}: TypographyProps) {
  const Component =
    as ??
    (variant === "display" || variant === "h1"
      ? "h1"
      : variant === "h2"
        ? "h2"
        : variant === "h3"
          ? "h3"
          : "p");

  return (
    <Component id={id} className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
}

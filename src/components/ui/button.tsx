import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "@/components/ui/spinner";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonShape = "default" | "pill";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  loading?: boolean;
  loadingLabel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-violet text-white hover:bg-accent-violet-hover border border-border-accent shadow-[var(--shadow-cta)] hover:-translate-y-px disabled:hover:translate-y-0 disabled:opacity-50",
  secondary:
    "bg-bg-inset/80 text-text-primary border border-border-emphasis hover:border-border-accent hover:bg-bg-elevated hover:-translate-y-px disabled:hover:translate-y-0 disabled:opacity-50",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary border border-transparent hover:bg-bg-elevated/35 disabled:opacity-50",
};

const shapeClasses: Record<ButtonShape, string> = {
  default: "rounded-lg",
  pill: "rounded-full",
};

export function Button({
  variant = "primary",
  shape = "default",
  className,
  type = "button",
  loading = false,
  loadingLabel,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-[var(--duration-normal)] motion-reduce:transform-none active:scale-[0.99]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
        "disabled:cursor-not-allowed disabled:opacity-50",
        shapeClasses[shape],
        variantClasses[variant],
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="size-4" label={loadingLabel} />
          <span>{loadingLabel ?? children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

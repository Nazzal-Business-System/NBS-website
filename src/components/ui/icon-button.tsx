import { cn } from "@/lib/cn";

type IconButtonProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
};

export function IconButton({
  children,
  label,
  className,
  onClick,
  href,
  external,
}: IconButtonProps) {
  const classes = cn(
    "inline-flex size-11 min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-border-hairline text-text-secondary transition-[color,background-color,border-color,opacity] duration-[var(--duration-normal)] hover:border-border-emphasis hover:text-text-primary active:scale-[0.98]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

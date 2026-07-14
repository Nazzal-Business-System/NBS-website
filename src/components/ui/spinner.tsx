import { cn } from "@/lib/cn";

type SpinnerProps = {
  className?: string;
  label?: string;
};

export function Spinner({ className, label }: SpinnerProps) {
  return (
    <span className={cn("nbs-spinner", className)} role="status">
      <span className="nbs-spinner-ring" aria-hidden />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

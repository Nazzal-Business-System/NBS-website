import { cn } from "@/lib/cn";

type ContainerSize = "default" | "narrow" | "reading";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
  size?: ContainerSize;
};

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-[var(--width-container)]",
  narrow: "max-w-[var(--width-narrow)]",
  reading: "max-w-[var(--width-reading)]",
};

export function Container({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}

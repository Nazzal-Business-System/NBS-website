"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const FALLBACK_MS = 1400;

function isNodeInView(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.98 && rect.bottom > vh * 0.02;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    const show = () => {
      if (!cancelled) setVisible(true);
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Defer so we don't sync-setState in the effect body (lint + hydration).
    const boot = window.requestAnimationFrame(() => {
      if (cancelled) return;
      if (media.matches || isNodeInView(node)) {
        show();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          show();
          observer.disconnect();
        },
        {
          threshold: 0.01,
          rootMargin: "0px 0px 12% 0px",
        },
      );

      observer.observe(node);
      cleanupObserver = () => observer.disconnect();
    });

    let cleanupObserver: (() => void) | undefined;
    const fallback = window.setTimeout(show, FALLBACK_MS);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(boot);
      cleanupObserver?.();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("nbs-reveal", visible && "is-visible", className)}
      style={{ ["--nbs-reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

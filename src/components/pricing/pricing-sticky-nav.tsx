"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { pricingNavItems } from "@/config/pricing";

type PricingStickyNavProps = {
  labels: Record<string, string>;
  ariaLabel: string;
  selectLabel: string;
};

export function PricingStickyNav({
  labels,
  ariaLabel,
  selectLabel,
}: PricingStickyNavProps) {
  const [active, setActive] = useState<string>(pricingNavItems[0].hash);
  const selectId = useId();

  useEffect(() => {
    const targets = pricingNavItems
      .map((item) => document.getElementById(item.hash))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );
        const top = visible[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(hash: string) {
    const el = document.getElementById(hash);
    if (!el) return;
    setActive(hash);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${hash}`);
  }

  return (
    <nav className="nbs-pricing-sticky-nav" aria-label={ariaLabel}>
      <div className="nbs-pricing-sticky-nav-shell">
        {/*
          One control per breakpoint via Tailwind display utilities
          (display:none). Do not leave both in layout/a11y/tab order.
        */}
        <div className="nbs-pricing-sticky-select-wrap grid md:hidden">
          <label className="nbs-pricing-sticky-select-label" htmlFor={selectId}>
            {selectLabel}
          </label>
          <select
            id={selectId}
            className="nbs-pricing-sticky-select"
            value={active}
            onChange={(event) => goTo(event.target.value)}
          >
            {pricingNavItems.map((item) => (
              <option key={item.hash} value={item.hash}>
                {labels[item.id] ?? item.id}
              </option>
            ))}
          </select>
        </div>

        <div
          className="nbs-pricing-sticky-nav-inner hidden md:flex"
          role="list"
        >
          {pricingNavItems.map((item) => (
            <a
              key={item.hash}
              role="listitem"
              href={`#${item.hash}`}
              className={cn(
                "nbs-pricing-sticky-link",
                active === item.hash && "is-active",
              )}
              aria-current={active === item.hash ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.hash);
              }}
            >
              {labels[item.id] ?? item.id}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

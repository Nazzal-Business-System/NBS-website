"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Typography } from "@/components/ui/typography";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  anchorId?: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("nbs-faq-list", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        const anchorId = item.anchorId ?? `faq-${item.id}`;

        return (
          <div key={item.id} id={anchorId} className="nbs-faq-item">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                className="nbs-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="min-w-0 flex-1 text-start">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "nbs-faq-chevron size-4 shrink-0",
                    isOpen && "is-open",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen ? true : undefined}
              className={cn("nbs-faq-panel", isOpen && "is-open")}
            >
              <div className="nbs-faq-panel-inner">
                <Typography variant="body" className="max-w-3xl pb-5 pe-8">
                  {item.answer}
                </Typography>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

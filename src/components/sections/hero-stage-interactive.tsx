"use client";

import { useRef } from "react";
import { homepageSectionIds } from "@/config/navigation";
import { useHeroStagePointer } from "@/lib/use-hero-stage-pointer";

type HeroStageInteractiveProps = {
  children: React.ReactNode;
};

export function HeroStageInteractive({ children }: HeroStageInteractiveProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useHeroStagePointer({
    heroId: homepageSectionIds.hero,
    tiltRef,
    glowRef,
  });

  return (
    <div className="nbs-hero-stage-scene">
      <div
        ref={glowRef}
        className="nbs-hero-stage-floor-glow"
        aria-hidden
      />
      <div className="nbs-hero-stage-perspective">
        <div ref={tiltRef} className="nbs-hero-stage-tilt">
          <div className="nbs-hero-stage-frame">
            <div className="nbs-hero-stage-chrome" aria-hidden>
              <span className="nbs-hero-stage-dot" />
              <span className="nbs-hero-stage-dot" />
              <span className="nbs-hero-stage-dot" />
              <span className="nbs-hero-stage-url" />
            </div>
            <div className="nbs-hero-stage-viewport">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

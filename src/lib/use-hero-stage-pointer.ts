"use client";

import { useEffect, useRef, type RefObject } from "react";

const MAX_ROTATE_X = 3;
const MAX_ROTATE_Y = 5;
const MAX_TRANSLATE_X = 6;
const MAX_TRANSLATE_Y = 4;
const MAX_GLOW_SHIFT = 14;
const DAMPING = 0.08;
const EPSILON = 0.01;

type MotionTarget = {
  rotateX: number;
  rotateY: number;
  translateX: number;
  translateY: number;
  glowX: number;
  glowY: number;
};

const zeroTarget = (): MotionTarget => ({
  rotateX: 0,
  rotateY: 0,
  translateX: 0,
  translateY: 0,
  glowX: 0,
  glowY: 0,
});

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

function isNearZero(value: number) {
  return Math.abs(value) < EPSILON;
}

type UseHeroStagePointerOptions = {
  heroId: string;
  tiltRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
};

export function useHeroStagePointer({
  heroId,
  tiltRef,
  glowRef,
}: UseHeroStagePointerOptions) {
  const enabledRef = useRef(false);
  const targetRef = useRef<MotionTarget>(zeroTarget());
  const currentRef = useRef<MotionTarget>(zeroTarget());
  const rafRef = useRef<number | null>(null);
  const pointerInsideRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const mobileViewport = window.matchMedia("(max-width: 1023px)");

    function evaluateEnabled() {
      return (
        !reducedMotion.matches &&
        !coarsePointer.matches &&
        !mobileViewport.matches
      );
    }

    function setInteractiveClass(active: boolean) {
      tiltRef.current?.classList.toggle("is-interactive", active);
      glowRef.current?.classList.toggle("is-interactive", active);
    }

    function applyMotion(motion: MotionTarget) {
      const tilt = tiltRef.current;
      const glow = glowRef.current;
      if (!tilt) return;

      tilt.style.setProperty("--hero-stage-dx", `${motion.rotateX}deg`);
      tilt.style.setProperty("--hero-stage-dy", `${motion.rotateY}deg`);
      tilt.style.setProperty("--hero-stage-tx", `${motion.translateX}px`);
      tilt.style.setProperty("--hero-stage-ty", `${motion.translateY}px`);

      if (glow) {
        glow.style.setProperty("--hero-glow-tx", `${motion.glowX}px`);
        glow.style.setProperty("--hero-glow-ty", `${motion.glowY}px`);
      }
    }

    function tick() {
      const target = targetRef.current;
      const current = currentRef.current;

      current.rotateX = lerp(current.rotateX, target.rotateX, DAMPING);
      current.rotateY = lerp(current.rotateY, target.rotateY, DAMPING);
      current.translateX = lerp(current.translateX, target.translateX, DAMPING);
      current.translateY = lerp(current.translateY, target.translateY, DAMPING);
      current.glowX = lerp(current.glowX, target.glowX, DAMPING);
      current.glowY = lerp(current.glowY, target.glowY, DAMPING);

      applyMotion(current);

      const settled =
        isNearZero(current.rotateX - target.rotateX) &&
        isNearZero(current.rotateY - target.rotateY) &&
        isNearZero(current.translateX - target.translateX) &&
        isNearZero(current.translateY - target.translateY) &&
        isNearZero(current.glowX - target.glowX) &&
        isNearZero(current.glowY - target.glowY);

      if (!pointerInsideRef.current && settled) {
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function updateTarget(clientX: number, clientY: number, hero: HTMLElement) {
      const rect = hero.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      const rtl = document.documentElement.dir === "rtl";
      const x = Math.max(-1, Math.min(1, nx));
      const y = Math.max(-1, Math.min(1, ny));
      const yaw = (rtl ? -x : x) * MAX_ROTATE_Y;

      targetRef.current = {
        rotateX: -y * MAX_ROTATE_X,
        rotateY: yaw,
        translateX: x * MAX_TRANSLATE_X,
        translateY: y * MAX_TRANSLATE_Y,
        glowX: x * MAX_GLOW_SHIFT,
        glowY: y * MAX_GLOW_SHIFT * 0.65,
      };
    }

    function resetTarget() {
      targetRef.current = zeroTarget();
    }

    function onPointerMove(event: PointerEvent) {
      if (!enabledRef.current || event.pointerType !== "mouse") return;

      const hero = document.getElementById(heroId);
      if (!hero) return;

      pointerInsideRef.current = true;
      updateTarget(event.clientX, event.clientY, hero);
      startLoop();
    }

    function onPointerLeave(event: PointerEvent) {
      if (!enabledRef.current || event.pointerType !== "mouse") return;

      pointerInsideRef.current = false;
      resetTarget();
      startLoop();
    }

    function syncEnabled() {
      const enabled = evaluateEnabled();
      enabledRef.current = enabled;
      setInteractiveClass(enabled);

      if (!enabled) {
        pointerInsideRef.current = false;
        resetTarget();
        currentRef.current = zeroTarget();
        applyMotion(zeroTarget());
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }

      applyMotion(currentRef.current);
    }

    syncEnabled();

    const hero = document.getElementById(heroId);
    if (!hero) return;

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);

    reducedMotion.addEventListener("change", syncEnabled);
    coarsePointer.addEventListener("change", syncEnabled);
    mobileViewport.addEventListener("change", syncEnabled);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      reducedMotion.removeEventListener("change", syncEnabled);
      coarsePointer.removeEventListener("change", syncEnabled);
      mobileViewport.removeEventListener("change", syncEnabled);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      setInteractiveClass(false);
    };
  }, [heroId, tiltRef, glowRef]);
}

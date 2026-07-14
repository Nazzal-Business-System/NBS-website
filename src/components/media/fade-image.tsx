"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

type FadeImageProps = Omit<ImageProps, "onLoad" | "onError"> & {
  /** Shown when the image fails to load (decorative images may omit). */
  errorLabel?: string;
  skeletonClassName?: string;
  wrapperClassName?: string;
};

/**
 * Reserves layout via parent sizing / fill+aspect, fades in after load,
 * and shows a compact error fallback when media fails.
 */
export function FadeImage({
  className,
  errorLabel,
  skeletonClassName,
  wrapperClassName,
  alt,
  ...props
}: FadeImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className={cn("nbs-fade-image-wrap", wrapperClassName)}>
      {status === "loading" ? (
        <div
          className={cn("nbs-media-skeleton", skeletonClassName)}
          aria-hidden
        />
      ) : null}

      {status !== "error" ? (
        <Image
          {...props}
          alt={alt}
          className={cn(
            "nbs-fade-image",
            status === "loaded" && "is-loaded",
            className,
          )}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      ) : (
        <div
          className="nbs-media-fallback"
          role="img"
          aria-label={errorLabel || alt || undefined}
        >
          {errorLabel ? (
            <span className="nbs-media-fallback-label">{errorLabel}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}

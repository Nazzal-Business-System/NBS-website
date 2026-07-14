"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

type ProductVideoStageProps = {
  poster: string;
  webm: string;
  mp4: string;
  caption: string;
  playLabel: string;
  unavailableLabel: string;
  playbackEnabled?: boolean;
  accent?: "cobalt" | "violet" | "cyan";
  scale?: "flagship" | "standard";
  className?: string;
};

export function ProductVideoStage({
  poster,
  webm,
  mp4,
  caption,
  playLabel,
  unavailableLabel,
  playbackEnabled = true,
  accent = "cobalt",
  scale = "flagship",
  className,
}: ProductVideoStageProps) {
  const captionId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setReducedMotion(media.matches);
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  async function handlePlay() {
    if (reducedMotion || posterFailed) return;
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    try {
      await video.play();
    } catch {
      setPlaying(false);
    }
  }

  function handleEnded() {
    const video = videoRef.current;
    if (video) video.pause();
    setPlaying(false);
  }

  const showPlay =
    playbackEnabled &&
    !reducedMotion &&
    posterReady &&
    !posterFailed &&
    !playing;

  return (
    <figure
      className={cn(
        "nbs-product-media",
        scale === "standard" && "nbs-product-media--standard",
        className,
      )}
      aria-describedby={captionId}
    >
      <div
        className={cn(
          "nbs-product-media-frame group",
          accent === "violet" && "nbs-product-media-frame--violet",
          accent === "cyan" && "nbs-product-media-frame--cyan",
        )}
      >
        <div className="nbs-product-media-surface">
          <video
            ref={videoRef}
            className={cn(
              "nbs-product-media-video",
              playing && "is-visible",
            )}
            controls={playing}
            playsInline
            preload="none"
            poster={poster}
            aria-label={caption}
            hidden={!playing}
            onEnded={handleEnded}
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>

          {!playing ? (
            <div className="nbs-product-media-poster">
              {!posterReady && !posterFailed ? (
                <div className="nbs-media-skeleton absolute inset-0" aria-hidden />
              ) : null}

              {!posterFailed ? (
                <Image
                  src={poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={cn(
                    "nbs-product-media-poster-image nbs-fade-image",
                    posterReady && "is-loaded",
                  )}
                  loading="lazy"
                  onLoad={() => setPosterReady(true)}
                  onError={() => {
                    setPosterFailed(true);
                    setPosterReady(false);
                  }}
                />
              ) : (
                <div
                  className="nbs-media-fallback"
                  role="img"
                  aria-label={unavailableLabel}
                >
                  <span className="nbs-media-fallback-label">
                    {unavailableLabel}
                  </span>
                </div>
              )}

              {showPlay ? (
                <button
                  type="button"
                  className="nbs-product-media-play"
                  onClick={handlePlay}
                  aria-label={playLabel}
                >
                  <Play className="size-5 fill-current" aria-hidden />
                </button>
              ) : null}

              {reducedMotion && posterReady && !posterFailed ? (
                <p className="nbs-product-media-static-note">{unavailableLabel}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <figcaption id={captionId} className="nbs-product-media-caption">
        {caption}
      </figcaption>
    </figure>
  );
}

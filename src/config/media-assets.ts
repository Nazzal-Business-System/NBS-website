import type { Locale } from "@/i18n/routing";

type LocalizedMedia = {
  poster: { en: string; ar: string };
  video: {
    en: { webm: string; mp4: string };
    ar: { webm: string; mp4: string };
  };
  playbackEnabled: boolean;
};

export type ProductMediaSources = {
  poster: string;
  webm: string;
  mp4: string;
  playbackEnabled: boolean;
};

function resolveMedia(locale: Locale, media: LocalizedMedia): ProductMediaSources {
  const lang = locale === "ar" ? "ar" : "en";
  return {
    poster: media.poster[lang],
    webm: media.video[lang].webm,
    mp4: media.video[lang].mp4,
    playbackEnabled: media.playbackEnabled,
  };
}

const erpMedia: LocalizedMedia = {
  poster: {
    en: "/media/posters/product-erp-poster-en.png",
    ar: "/media/posters/product-erp-poster-en.png",
  },
  video: {
    en: {
      webm: "/media/products/innovation-erp/product-erp-cinema-en.webm",
      mp4: "/media/products/innovation-erp/product-erp-cinema-en.mp4",
    },
    ar: {
      webm: "/media/products/innovation-erp/product-erp-cinema-ar.webm",
      mp4: "/media/products/innovation-erp/product-erp-cinema-ar.mp4",
    },
  },
  playbackEnabled: false,
};

const posMedia: LocalizedMedia = {
  poster: {
    en: "/media/posters/product-pos-poster-en.png",
    ar: "/media/posters/product-pos-poster-en.png",
  },
  video: {
    en: {
      webm: "/media/products/pos/product-pos-cinema-en.webm",
      mp4: "/media/products/pos/product-pos-cinema-en.mp4",
    },
    ar: {
      webm: "/media/products/pos/product-pos-cinema-ar.webm",
      mp4: "/media/products/pos/product-pos-cinema-ar.mp4",
    },
  },
  playbackEnabled: false,
};

const imsMedia: LocalizedMedia = {
  poster: {
    en: "/media/posters/product-ims-poster.png",
    ar: "/media/posters/product-ims-poster.png",
  },
  video: {
    en: {
      webm: "/media/products/ims/product-ims-cinema-en.webm",
      mp4: "/media/products/ims/product-ims-cinema-en.mp4",
    },
    ar: {
      webm: "/media/products/ims/product-ims-cinema-ar.webm",
      mp4: "/media/products/ims/product-ims-cinema-ar.mp4",
    },
  },
  playbackEnabled: false,
};

export function getErpMediaSources(locale: Locale): ProductMediaSources {
  return resolveMedia(locale, erpMedia);
}

export function getPosMediaSources(locale: Locale): ProductMediaSources {
  return resolveMedia(locale, posMedia);
}

export function getImsMediaSources(locale: Locale): ProductMediaSources {
  return resolveMedia(locale, imsMedia);
}

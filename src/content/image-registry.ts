import type { CSSProperties } from "react";
import manifest from "./images.json";
import { encodeAssetPath } from "@/lib/assets";

export type SiteImageData = { src: string; alt: string };

type ImageManifest = {
  brand: { header: SiteImageData; footer: SiteImageData };
  defaults: { hero: SiteImageData; social: SiteImageData };
  backgrounds: Record<string, SiteImageData>;
  home: {
    slides: SiteImageData[];
    about: { primary: SiteImageData; secondary: SiteImageData };
    projects: SiteImageData[];
    transformation: SiteImageData;
    process: { measurement: SiteImageData; delivery: SiteImageData; installation: SiteImageData };
  };
  pages: Record<string, { hero: SiteImageData; gallery?: SiteImageData[] }>;
  catalog: Record<string, { cover: SiteImageData; gallery: SiteImageData[] }>;
  services: Record<string, { cover: SiteImageData }>;
  articles: Record<string, { cover: SiteImageData }>;
};

export const siteImages = manifest satisfies ImageManifest;

export const imageBackgrounds = Object.fromEntries(
  Object.entries(siteImages.backgrounds).map(([name, { src }]) => [
    `--image-${name}`,
    `url(${JSON.stringify(encodeAssetPath(src))})`,
  ]),
) as CSSProperties;

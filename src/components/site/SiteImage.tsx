import NextImage, { type ImageProps } from "next/image";
import { encodeAssetPath } from "@/lib/assets";

// Encode each path segment, including commas, for Next's production asset lookup.
export function SiteImage({ src, ...props }: ImageProps) {
  const source = typeof src === "string" ? encodeAssetPath(src) : src;

  return <NextImage src={source} {...props} />;
}

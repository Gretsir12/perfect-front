/** Accepts original local paths; each segment is encoded once for HTTP/CSS/metadata. */
export function encodeAssetPath(src: string): string {
  return src.startsWith("/")
    ? src.split("/").map((segment) => encodeURIComponent(segment)).join("/")
    : src;
}

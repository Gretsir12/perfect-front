import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const legacyRoutes: Array<[string, string]> = [
  ["/woocommerce-pages/katalog-ograzhdenij-iz-stekla", "/izdeliya"],
  ["/service-pages/uslugi", "/uslugi"],
  ["/woocommerce-pages/promyshlennoe-osteklenie", "/ograzhdayushchie-konstruktsii"],
  ["/about-pages", "/o-kompanii"],
  ["/contact-pages/kontakty", "/kontakty"],
  ["/archive-pages/blog", "/blog"],
  ["/privacy-policy", "/privacy"],
  ["/dushevoe-ograzhdenie-iz-nerzhaveyushhej-stali", "/blog/dushevoe-ograzhdenie-iz-nerzhaveyushhej-stali"],
  ["/ograzhdenie-iz-stekla-dlya-terras", "/blog/ograzhdenie-iz-stekla-dlya-terras"],
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const match = legacyRoutes.find(([legacy]) => pathname === legacy || pathname.startsWith(`${legacy}/`));
  if (!match) return NextResponse.next();
  const destination = new URL(match[1], request.url);
  destination.search = request.nextUrl.search;
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: [
    "/woocommerce-pages/:path*",
    "/service-pages/:path*",
    "/about-pages/:path*",
    "/contact-pages/:path*",
    "/archive-pages/:path*",
    "/privacy-policy/:path*",
    "/dushevoe-ograzhdenie-iz-nerzhaveyushhej-stali/:path*",
    "/ograzhdenie-iz-stekla-dlya-terras/:path*",
  ],
};

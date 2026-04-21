import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["pt", "en"] as const;
const DEFAULT_LOCALE = "pt";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages();
  try {
    return match(languages, LOCALES as unknown as string[], DEFAULT_LOCALE);
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

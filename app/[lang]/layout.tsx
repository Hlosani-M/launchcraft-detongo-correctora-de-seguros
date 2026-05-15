import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, hasLocale, LOCALES, type Locale } from "./dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { OrganizationJsonLd } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://detondocorretora.com";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const home = dict.meta.home;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: home.title,
      template: `%s · ${dict.common.brand}`,
    },
    description: home.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        pt: "/pt",
        en: "/en",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: home.title,
      description: home.description,
      url: `${siteUrl}/${lang}`,
      locale: lang === "pt" ? "pt_AO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#171A35",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const typedLang = lang as Locale;

  return (
    <html
      lang={typedLang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-ivory text-brand-navy">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-brand-ivory"
        >
          {dict.common.skipToContent}
        </a>
        <Header lang={typedLang} dict={dict.common} />
        <main id="main" className="flex-1">
          {props.children}
        </main>
        <Footer lang={typedLang} dict={dict.common} />
        <CookieBanner lang={typedLang} dict={dict.common.cookieBanner} />
        <OrganizationJsonLd lang={typedLang} dict={dict} siteUrl={siteUrl} />
        {gaId && process.env.NODE_ENV === "production" ? (
          <GoogleAnalytics gaId={gaId} />
        ) : null}
      </body>
    </html>
  );
}

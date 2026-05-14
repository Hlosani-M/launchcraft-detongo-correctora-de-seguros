import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../../dictionaries";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

const PRODUCTS = [
  "motor",
  "building",
  "home-contents",
  "all-risks",
  "liability",
  "travel",
] as const;
type Product = (typeof PRODUCTS)[number];

const isProduct = (v: string): v is Product =>
  (PRODUCTS as readonly string[]).includes(v);

const IMAGES: Record<Product, string> = {
  motor: "/personal/car-cover.jpg",
  building: "/personal/building-cover.jpg",
  "home-contents": "/personal/home-content.jpg",
  "all-risks": "/personal/all-risk.jpg",
  liability: "/personal/personal-liability.jpg",
  travel: "/personal/travel.jpg",
};

export async function generateStaticParams() {
  const langs: Locale[] = ["pt", "en"];
  return langs.flatMap((lang) =>
    PRODUCTS.map((product) => ({ lang, product })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[lang]/services/personal/[product]">,
): Promise<Metadata> {
  const { lang, product } = await props.params;
  if (!hasLocale(lang) || !isProduct(product)) return {};
  const dict = await getDictionary(lang as Locale);
  const productDict = dict.personal.products[product];
  return {
    title: productDict.meta.title,
    description: productDict.meta.description,
    alternates: {
      canonical: `/${lang}/services/personal/${product}`,
      languages: {
        pt: `/pt/services/personal/${product}`,
        en: `/en/services/personal/${product}`,
        "x-default": `/pt/services/personal/${product}`,
      },
    },
  };
}

export default async function PersonalProductPage(
  props: PageProps<"/[lang]/services/personal/[product]">,
) {
  const { lang, product } = await props.params;
  if (!hasLocale(lang) || !isProduct(product)) notFound();
  const dict = await getDictionary(lang as Locale);
  const productDict = dict.personal.products[product];
  const heroImage = IMAGES[product];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-brand-ivory">
        {/* Mobile: full-bleed background */}
        <div aria-hidden className="absolute inset-0 lg:hidden">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 1px, 100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/85 via-brand-navy-deep/60 to-brand-navy-deep/85" />
        </div>
        {/* Desktop: wide right-bleed panel */}
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="62vw"
            className="object-cover object-center"
            priority
          />
          {/* Left-edge melt */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep from-[10%] via-brand-navy-deep/40 via-[38%] to-transparent" />
          {/* Subtle top/bottom blends */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/40 via-transparent to-brand-navy-deep/50" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:py-32">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
              {productDict.eyebrow}
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {productDict.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-ivory/80 sm:text-lg">
              {productDict.description}
            </p>
            <div className="mt-8">
              <LinkButton
                href={`/${lang}/contact`}
                size="lg"
                variant="primary"
              >
                {dict.ctaBand.primaryCta}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section tone="surface" title={productDict.featuresTitle}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productDict.features.map((feature, i) => (
            <Reveal key={feature} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-azure/10 text-brand-azure"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    aria-hidden
                  >
                    <path
                      d="M3 8.5L6.5 12L13 5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium leading-6 text-brand-navy">
                  {feature}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Details */}
      <Section tone="ivory" title={productDict.detailsTitle}>
        <Reveal>
          <p className="max-w-3xl text-base leading-7 text-brand-slate sm:text-lg">
            {productDict.details}
          </p>
        </Reveal>
      </Section>

      <CtaBand lang={lang} dict={dict.ctaBand} hideSecondary />
    </>
  );
}

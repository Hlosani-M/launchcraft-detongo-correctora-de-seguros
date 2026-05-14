import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { PersonalInsurance } from "@/components/sections/PersonalInsurance";
import { BusinessInsurance } from "@/components/sections/BusinessInsurance";
import { Reinsurance } from "@/components/sections/Reinsurance";
import { TreatyAlternative } from "@/components/sections/TreatyAlternative";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

const CATEGORIES = ["personal", "business", "reinsurance"] as const;
type Category = (typeof CATEGORIES)[number];

const isCategory = (v: string): v is Category =>
  (CATEGORIES as readonly string[]).includes(v);

export async function generateStaticParams() {
  const langs: Locale[] = ["pt", "en"];
  return langs.flatMap((lang) =>
    CATEGORIES.map((category) => ({ lang, category })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[lang]/services/[category]">,
): Promise<Metadata> {
  const { lang, category } = await props.params;
  if (!hasLocale(lang) || !isCategory(category)) return {};
  const dict = await getDictionary(lang as Locale);
  const title =
    category === "personal"
      ? dict.personal.title
      : category === "business"
        ? dict.business.title
        : dict.reinsurance.title;
  const description =
    category === "personal"
      ? dict.personal.description
      : category === "business"
        ? dict.business.description
        : dict.reinsurance.description;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/services/${category}`,
      languages: {
        pt: `/pt/services/${category}`,
        en: `/en/services/${category}`,
        "x-default": `/pt/services/${category}`,
      },
    },
  };
}

export default async function CategoryPage(
  props: PageProps<"/[lang]/services/[category]">,
) {
  const { lang, category } = await props.params;
  if (!hasLocale(lang) || !isCategory(category)) notFound();
  const dict = await getDictionary(lang as Locale);

  const heroCopy =
    category === "personal"
      ? { eyebrow: dict.personal.eyebrow, title: dict.personal.title, description: dict.personal.description }
      : category === "business"
        ? { eyebrow: dict.business.eyebrow, title: dict.business.title, description: dict.business.description }
        : { eyebrow: dict.reinsurance.eyebrow, title: dict.reinsurance.title, description: dict.reinsurance.description };

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient text-brand-ivory">
        {category === "reinsurance" || category === "personal" || category === "business" ? (
          <>
            {/* Mobile: full-bleed background */}
            <div aria-hidden className="absolute inset-0 lg:hidden">
              <Image
                src={
                  category === "personal"
                    ? "/personal.jpg"
                    : category === "business"
                      ? "/business-insurance.jpg"
                      : "/reinsurance.jpg"
                }
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
                src={
                  category === "personal"
                    ? "/personal.jpg"
                    : category === "business"
                      ? "/business-insurance.jpg"
                      : "/reinsurance.jpg"
                }
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
          </>
        ) : (
          <ParallelogramAccent
            tone="azure"
            className="pointer-events-none absolute -right-20 -top-16 h-[420px] w-[520px] opacity-25"
          />
        )}
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:py-32">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
              {heroCopy.eyebrow}
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {heroCopy.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-ivory/80 sm:text-lg">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>

      {category === "personal" ? (
        <PersonalInsurance
          lang={lang}
          dict={dict.personal}
          cta={dict.common.cta.contact}
        />
      ) : null}

      {category === "business" ? (
        <BusinessInsurance
          lang={lang}
          dict={dict.business}
          cta={dict.common.cta.contact}
        />
      ) : null}

      {category === "reinsurance" ? (
        <>
          <Reinsurance
            lang={lang}
            dict={dict.reinsurance}
            cta={dict.common.cta.contact}
          />
          <TreatyAlternative dict={dict.treaty} />
          <Section
            tone="surface"
            eyebrow={dict.lifeHealth.eyebrow}
            title={dict.lifeHealth.title}
            description={dict.lifeHealth.description}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]">
                  <h3 className="text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
                    {dict.lifeHealth.lifeTitle}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {dict.lifeHealth.lifeItems.map((it) => (
                      <li
                        key={it}
                        className="rounded-full border border-brand-slate/20 bg-brand-surface px-3 py-1 text-xs font-medium text-brand-navy"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="h-full rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]">
                  <h3 className="text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
                    {dict.lifeHealth.healthTitle}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {dict.lifeHealth.healthItems.map((it) => (
                      <li
                        key={it}
                        className="rounded-full border border-brand-slate/20 bg-brand-surface px-3 py-1 text-xs font-medium text-brand-navy"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Section>
        </>
      ) : null}

      <CtaBand lang={lang} dict={dict.ctaBand} />
    </>
  );
}

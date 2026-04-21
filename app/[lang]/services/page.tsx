import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { ShieldIcon, BriefcaseIcon, LayersIcon } from "@/components/ui/Icons";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

export async function generateMetadata(
  props: PageProps<"/[lang]/services">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: {
      canonical: `/${lang}/services`,
      languages: {
        pt: "/pt/services",
        en: "/en/services",
        "x-default": "/pt/services",
      },
    },
  };
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  personal: ShieldIcon,
  business: BriefcaseIcon,
  reinsurance: LayersIcon,
};

export default async function ServicesHubPage(
  props: PageProps<"/[lang]/services">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const hub = dict.servicesHub;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient text-brand-ivory">
        <ParallelogramAccent
          tone="azure"
          className="pointer-events-none absolute -left-20 -top-16 h-[420px] w-[520px] opacity-25"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
              {hub.eyebrow}
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {hub.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-ivory/80 sm:text-lg">
              {hub.description}
            </p>
          </div>
        </div>
      </section>

      <Section tone="ivory">
        <div className="grid gap-6 md:grid-cols-3">
          {hub.cards.map((card, i) => {
            const Icon = ICONS[card.slug] ?? ShieldIcon;
            return (
              <Reveal key={card.slug} delay={i * 0.05}>
                <ServiceCard
                  name={card.name}
                  description={card.description}
                  icon={<Icon />}
                  href={`/${lang}/services/${card.slug}`}
                  cta={dict.common.cta.learnMore}
                />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand lang={lang} dict={dict.ctaBand} />
    </>
  );
}

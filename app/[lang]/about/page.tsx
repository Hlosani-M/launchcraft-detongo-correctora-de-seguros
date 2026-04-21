import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { VisionValues } from "@/components/sections/VisionValues";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { CtaBand } from "@/components/sections/CtaBand";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

export async function generateMetadata(
  props: PageProps<"/[lang]/about">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        pt: "/pt/about",
        en: "/en/about",
        "x-default": "/pt/about",
      },
    },
  };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const about = dict.about;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient text-brand-ivory">
        <ParallelogramAccent
          tone="azure"
          className="pointer-events-none absolute -right-20 -top-10 h-[440px] w-[540px] opacity-25"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
              {about.hero.eyebrow}
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {about.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-ivory/80 sm:text-lg">
              {about.hero.description}
            </p>
          </div>
        </div>
      </section>

      <Section tone="ivory" containerClassName="">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <article className="rounded-3xl bg-brand-surface p-8 ring-1 ring-brand-slate/15">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">
                {about.missionTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-slate">
                {about.missionDescription}
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.05}>
            <article className="rounded-3xl bg-brand-navy p-8 text-brand-ivory">
              <h2 className="text-2xl font-semibold tracking-tight">
                {about.purposeTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-ivory/80">
                {about.purposeDescription}
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      <WhoWeAre dict={dict.whoWeAre} />

      <Section
        tone="surface"
        eyebrow={dict.vision.eyebrow}
        title={about.capabilitiesTitle}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {about.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]">
                <div className="h-1 w-10 rounded-full bg-brand-azure" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-brand-navy">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-slate">
                  {c.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <VisionValues dict={dict.vision} />
      <CtaBand lang={lang} dict={dict.ctaBand} />
    </>
  );
}

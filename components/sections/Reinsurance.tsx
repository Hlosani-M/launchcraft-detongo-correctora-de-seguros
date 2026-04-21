import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LayersIcon, SparkIcon, GlobeIcon } from "@/components/ui/Icons";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  classesTitle: string;
  classes: string[];
  servicesTitle: string;
  services: string[];
  ancillaryTitle: string;
  ancillary: string[];
};

export function Reinsurance({
  lang,
  dict,
  cta,
}: {
  lang: string;
  dict: Dict;
  cta: string;
}) {
  return (
    <Section
      id="reinsurance"
      tone="navy"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-2xl bg-brand-ivory/5 p-7 ring-1 ring-brand-ivory/10 backdrop-blur">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-azure/20 text-brand-azure">
              <LayersIcon />
            </div>
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              {dict.classesTitle}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {dict.classes.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-brand-ivory/15 bg-brand-ivory/5 px-3 py-1 text-xs font-medium text-brand-ivory/85"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="h-full rounded-2xl bg-brand-ivory/5 p-7 ring-1 ring-brand-ivory/10 backdrop-blur">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-azure/20 text-brand-azure">
              <SparkIcon />
            </div>
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              {dict.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-brand-ivory/80">
              {dict.services.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-3 flex-shrink-0 rounded-full bg-brand-azure"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl bg-brand-ivory/5 p-7 ring-1 ring-brand-ivory/10 backdrop-blur">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-azure/20 text-brand-azure">
              <GlobeIcon />
            </div>
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              {dict.ancillaryTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-brand-ivory/80">
              {dict.ancillary.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-3 flex-shrink-0 rounded-full bg-brand-azure"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-10">
        <a
          href={`/${lang}/services/reinsurance`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-azure transition-all hover:gap-2.5"
        >
          {cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </Section>
  );
}

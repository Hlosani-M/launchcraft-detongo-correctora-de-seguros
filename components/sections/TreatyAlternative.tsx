import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/Icons";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  capabilitiesTitle: string;
  capabilities: string[];
  servicesTitle: string;
  servicesDescription: string;
  services: { title: string; description: string }[];
};

export function TreatyAlternative({ dict }: { dict: Dict }) {
  return (
    <Section
      tone="ivory"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal>
          <div className="rounded-3xl bg-brand-surface p-8 ring-1 ring-brand-slate/15">
            <h3 className="text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
              {dict.capabilitiesTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-brand-slate">
              {dict.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-azure/15 text-brand-azure">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-brand-navy">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="text-xl font-semibold tracking-tight text-brand-navy sm:text-2xl">
              {dict.servicesTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-brand-slate sm:text-base">
              {dict.servicesDescription}
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {dict.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="group h-full rounded-2xl bg-white p-6 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:ring-brand-azure">
                  <div className="h-0.5 w-10 rounded-full bg-brand-azure transition-all group-hover:w-16" />
                  <h4 className="mt-4 text-base font-semibold tracking-tight text-brand-navy">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-brand-slate">
                    {s.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

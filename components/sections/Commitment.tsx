import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HandshakeIcon, DocumentIcon, ShieldIcon } from "@/components/ui/Icons";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  pillars: { title: string; description: string }[];
};

const ICONS = [HandshakeIcon, DocumentIcon, ShieldIcon];

export function Commitment({ dict }: { dict: Dict }) {
  return (
    <Section
      tone="ivory"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {dict.pillars.map((pillar, i) => {
          const Icon = ICONS[i] ?? HandshakeIcon;
          return (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:ring-brand-azure">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-slate">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

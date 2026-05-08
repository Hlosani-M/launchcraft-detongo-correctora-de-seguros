import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BriefcaseIcon, BoltIcon, OilDropIcon } from "@/components/ui/Icons";
import type { ComponentType } from "react";

type Item = { id: string; name: string; description: string };

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
};

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  corporate: BriefcaseIcon,
  energy: BoltIcon,
  oilgas: OilDropIcon,
};

export function Sectors({ dict }: { dict: Dict }) {
  return (
    <Section
      id="sectors"
      tone="ivory"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {dict.items.map((item, i) => {
          const Icon = ICONS[item.id] ?? BriefcaseIcon;
          return (
            <Reveal key={item.id} delay={i * 0.05}>
              <article className="relative h-full overflow-hidden rounded-3xl bg-brand-navy p-8 text-brand-ivory ring-1 ring-brand-ivory/10 transition-transform duration-200 hover:-translate-y-1">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-azure/20 blur-3xl"
                />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-brand-ivory/75">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

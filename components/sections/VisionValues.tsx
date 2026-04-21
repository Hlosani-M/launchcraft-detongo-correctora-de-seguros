import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ValuePill } from "@/components/ui/ValuePill";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  valuesTitle: string;
  valuesDescription: string;
  values: { name: string; description: string }[];
};

export function VisionValues({ dict }: { dict: Dict }) {
  return (
    <Section tone="surface" containerClassName="relative">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-10 text-brand-ivory">
            <ParallelogramAccent
              tone="azure"
              className="pointer-events-none absolute -right-24 -top-16 h-80 w-96 opacity-30"
            />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
                {dict.eyebrow}
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-brand-ivory/80">
                {dict.description}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.valuesTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-slate">
              {dict.valuesDescription}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {dict.values.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.05}>
                <ValuePill
                  name={v.name}
                  description={v.description}
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

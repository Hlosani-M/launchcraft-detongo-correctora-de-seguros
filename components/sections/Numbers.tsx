import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Item = { value: string; label: string };

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
};

export function Numbers({ dict }: { dict: Dict }) {
  return (
    <Section
      id="numbers"
      tone="navy"
      chapter="02"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <Reveal>
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((stat, i) => (
            <div
              key={stat.label}
              className="border-t border-brand-ivory/15 pt-6"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
                <span className="mr-2 font-mono text-brand-ivory/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {stat.label}
              </dt>
              <dd className="mt-5 text-5xl font-semibold tracking-tight text-brand-ivory sm:text-6xl lg:text-7xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

export function Partners({ dict }: { dict: Dict }) {
  return (
    <Section
      id="partners"
      tone="surface"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {dict.items.map((name) => (
            <li
              key={name}
              className="group relative flex h-20 items-center justify-center rounded-2xl bg-white px-4 text-center ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:ring-brand-azure"
            >
              <span className="text-sm font-semibold tracking-tight text-brand-navy">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

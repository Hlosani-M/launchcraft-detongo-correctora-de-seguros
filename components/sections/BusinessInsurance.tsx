import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon, BriefcaseIcon } from "@/components/ui/Icons";

type Item = { id: string; name: string };

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
  groupTitle: string;
  groupDescription: string;
  groupItems: string[];
};

export function BusinessInsurance({
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
      id="business"
      tone="surface"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {dict.items.map((item) => (
              <li
                key={item.id}
                className="group flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-brand-slate/15 transition-all duration-200 hover:ring-brand-azure"
              >
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-azure/15 text-brand-azure transition-colors group-hover:bg-brand-azure group-hover:text-brand-navy">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-brand-navy">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-3xl bg-brand-navy p-8 text-brand-ivory">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-azure/25 blur-3xl"
            />
            <div className="relative">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-azure/20 text-brand-azure">
                <BriefcaseIcon />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                {dict.groupTitle}
              </h3>
              <p className="mt-3 text-sm leading-6 text-brand-ivory/75">
                {dict.groupDescription}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {dict.groupItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-brand-azure"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`/${lang}/services/business`}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-azure transition-all hover:gap-2.5"
              >
                {cta}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

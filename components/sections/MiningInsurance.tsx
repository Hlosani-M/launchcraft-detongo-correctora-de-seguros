import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MiningIcon } from "@/components/ui/Icons";

type Category = {
  id: string;
  title: string;
  items: string[];
};

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  categories: Category[];
};

const CATEGORY_ICONS: Record<string, string> = {
  equipment: "M12 3l3 3-7 7-3-3 7-7zm3 3l3 3M5 13l-2 6 6-2",
  liability: "M12 3l9 5v6c0 5-4 9-9 10C3 23 3 19 3 14V8l9-5z",
  transport: "M2 17L12 3l10 14H2zm10-3v4",
  people: "M17 20h5v-1a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-1a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
  operational: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
};

export function MiningInsurance({
  dict,
}: {
  dict: Dict;
}) {
  return (
    <Section
      id="mining"
      tone="surface"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dict.categories.map((category, i) => {
          const iconPath = CATEGORY_ICONS[category.id];
          return (
            <Reveal key={category.id} delay={i * 0.07}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-azure/10 text-brand-azure">
                  {iconPath ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden
                    >
                      <path
                        d={iconPath}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <MiningIcon className="h-5 w-5" />
                  )}
                </div>
                <h3 className="text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
                  {category.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-brand-slate"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-azure"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

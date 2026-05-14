import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

const LOGO_MAP: Record<string, { src: string; width: number; height: number }> = {
  "ENSA Seguros": { src: "/partners/ensa-logo.png", width: 320, height: 120 },
  "Nossa Seguros": { src: "/partners/nossa-logo.png", width: 320, height: 120 },
  "BIC Seguros": { src: "/partners/bic-logo.png", width: 320, height: 120 },
  "Sanlam Seguros": { src: "/partners/sanlam-logo.svg", width: 320, height: 120 },
  "Fidelidade Seguros": { src: "/partners/fidelidade-logo.png", width: 320, height: 120 },
  "STAS Seguros": { src: "/partners/sta-logo.png", width: 320, height: 120 },
  "Proteja Seguros": { src: "/partners/protteja-logo.png", width: 320, height: 120 },
  "Viva Seguros": { src: "/partners/viva-logo.png", width: 320, height: 120 },
  "Unisaúde Seguros": { src: "/partners/unisaude-logo.png", width: 320, height: 120 },
  "Fortaleza Seguros": { src: "/partners/fortaleza-logo.svg", width: 320, height: 120 },
};

export function Partners({
  dict,
  chapter,
}: {
  dict: Dict;
  chapter?: string;
}) {
  return (
    <Section
      id="partners"
      tone="surface"
      chapter={chapter}
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {dict.items.map((name) => {
            const logo = LOGO_MAP[name];
            return (
              <li
                key={name}
                className="group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:ring-brand-azure sm:h-28 lg:h-32"
                title={name}
              >
                {logo ? (
                  <Image
                    src={logo.src}
                    alt={name}
                    width={logo.width}
                    height={logo.height}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 18vw"
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                ) : (
                  <span className="text-sm font-semibold tracking-tight text-brand-navy">
                    {name}
                  </span>
                )}
                <span className="sr-only">{name}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  reinsurers: {
    title: string;
    items: string[];
  };
};

type LogoEntry = {
  src: string;
  width: number;
  height: number;
  /** Extra padding class for the card — defaults to "p-5" */
  padding?: string;
  /** Extra classes applied to the card <li> (e.g. dark background) */
  cardClass?: string;
  /** Extra classes applied to the <Image> element (e.g. scale transforms) */
  imgClass?: string;
};

const LOGO_MAP: Record<string, LogoEntry> = {
      "ENSA Seguros":         { src: "/partners/ensa-logo.jpg",      width: 320, height: 120 },
  "Nossa Seguros":        { src: "/partners/nossa-logo.png",     width: 320, height: 120 },
  "BIC Seguros":          { src: "/partners/bic-logo.png",       width: 320, height: 120 },
  "Sanlam Seguros":       { src: "/partners/sanlam-logo.svg",    width: 320, height: 120 },
  "Fidelidade Seguros":   { src: "/partners/fidelidade-logo.png",width: 320, height: 120 },
  "STAS Seguros":         { src: "/partners/sta-logo.png",       width: 320, height: 120 },
  "Proteja Seguros":      { src: "/partners/protteja-logo.png",  width: 320, height: 120 },
  "Viva Seguros":         { src: "/partners/viva-logo.png",      width: 320, height: 120 },
  "Unisaúde Seguros":     { src: "/partners/unisaude-logo.png",  width: 320, height: 120 },
  "Fortaleza Seguros":    { src: "/partners/fortaleza-logo.svg", width: 320, height: 120 },
  "Harmonia Seguros S.A.":{ src: "/partners/harmonia-logo.png",  width: 320, height: 120 },
  "Aliança Seguros":      { src: "/partners/alianca.jpeg",       width: 320, height: 120 },
  "Mundial Seguros":      { src: "/partners/mudial-logo.png",    width: 320, height: 120 },
  "Swiss Re":             { src: "/partners/swiss-logo.png",     width: 320, height: 120 },
  "Munich Re":            { src: "/partners/munich-logo.png",    width: 320, height: 120 },
  "Lloyd's of London":    { src: "/partners/lloyds-logo.png",    width: 320, height: 120, cardClass: "bg-brand-navy ring-brand-navy/30 hover:ring-brand-azure/60", padding: "p-4" },
};

function LogoCard({ name, sizes }: { name: string; sizes: string }) {
  const logo = LOGO_MAP[name];
  const padding = logo?.padding ?? "p-5";
  const cardClass = logo?.cardClass ?? "bg-white";
  return (
    <li
      className={`group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl ${cardClass} ${padding} ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:ring-brand-azure sm:h-28 lg:h-32`}
      title={name}
    >
      {logo ? (
        <Image
          src={logo.src}
          alt={name}
          width={logo.width}
          height={logo.height}
          sizes={sizes}
          className={`max-h-full w-auto max-w-full object-contain${logo.imgClass ? ` ${logo.imgClass}` : ""}`}
        />
      ) : (
        <span className="text-sm font-semibold tracking-tight text-brand-navy">
          {name}
        </span>
      )}
      <span className="sr-only">{name}</span>
    </li>
  );
}

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
          {dict.items.map((name) => (
            <LogoCard
              key={name}
              name={name}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 18vw"
            />
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <div className="mt-12 border-t border-brand-slate/10 pt-10">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-brand-slate">
            {dict.reinsurers.title}
          </p>
          <ul className="mx-auto grid max-w-2xl grid-cols-3 gap-4">
            {dict.reinsurers.items.map((name) => (
              <LogoCard
                key={name}
                name={name}
                sizes="(max-width: 640px) 30vw, 20vw"
              />
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

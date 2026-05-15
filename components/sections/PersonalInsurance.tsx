import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";

type Item = { id: string; name: string; description: string };

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
};

const IMAGES: Record<string, string> = {
  motor: "/personal/car-cover.jpg",
  building: "/personal/building-cover.jpg",
  "home-contents": "/personal/home-content.jpg",
  "all-risks": "/personal/all-risk.jpg",
  liability: "/personal/personal-liability.jpg",
  travel: "/personal/travel.jpg",
};

export function PersonalInsurance({
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
      id="personal"
      tone="ivory"
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dict.items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.04}>
            <ServiceCard
              tone="light"
              name={item.name}
              description={item.description}
              image={IMAGES[item.id]}
              href={`/${lang}/services/personal/${item.id}`}
              cta={cta}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

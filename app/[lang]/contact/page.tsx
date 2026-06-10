import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { EmailDirectory } from "@/components/sections/EmailDirectory";
import { ClaimsBanner } from "@/components/sections/ClaimsBanner";
import {
  MapPinIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
} from "@/components/ui/Icons";

export async function generateMetadata(
  props: PageProps<"/[lang]/contact">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  const url = `/${lang}/contact`;
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: url,
      languages: {
        pt: "/pt/contact",
        en: "/en/contact",
        "x-default": "/pt/contact",
      },
    },
  };
}

export default async function ContactPage(
  props: PageProps<"/[lang]/contact">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const searchParams = await props.searchParams;
  const initialTopic =
    typeof searchParams?.topic === "string" ? searchParams.topic : undefined;

  return (
    <Section
      tone="ivory"
      eyebrow={dict.contact.eyebrow}
      title={dict.contact.title}
      description={dict.contact.description}
    >
      <ClaimsBanner dict={dict.contact.claimsBanner} />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-brand-navy">
              {dict.contact.infoTitle}
            </h2>

            <ul className="space-y-5 text-sm text-brand-navy">
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
                  <MapPinIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-mid">
                    {dict.contact.addressTitle}
                  </div>
                  <p className="mt-1 leading-6 text-brand-slate">
                    {dict.contact.address}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
                  <PhoneIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-mid">
                    {dict.contact.phoneTitle}
                  </div>
                  <div className="mt-1 flex flex-col text-brand-slate">
                    <a
                      href="tel:+244921545832"
                      className="transition-colors hover:text-brand-navy"
                    >
                      +244 921 545 832
                    </a>
                    <a
                      href="tel:+244923254449"
                      className="transition-colors hover:text-brand-navy"
                    >
                      +244 923 254 449
                    </a>
                    <a
                      href="tel:+244946451069"
                      className="transition-colors hover:text-brand-navy"
                    >
                      +244 946 451 069
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
                  <EmailIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-mid">
                    {dict.contact.emailTitle}
                  </div>
                  <a
                    href={`mailto:${dict.contact.emailAddress}`}
                    className="mt-1 block text-brand-slate transition-colors hover:text-brand-navy"
                  >
                    {dict.contact.emailAddress}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
                  <ClockIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-mid">
                    {dict.contact.hoursTitle}
                  </div>
                  <p className="mt-1 leading-6 text-brand-slate">
                    {dict.contact.hours}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-slate/15 sm:p-8 lg:p-10">
            <ContactForm locale={lang as Locale} dict={dict.contact.form} initialTopic={initialTopic} />
          </div>
        </Reveal>
      </div>

      <EmailDirectory dict={dict.contact.directory} />
    </Section>
  );
}

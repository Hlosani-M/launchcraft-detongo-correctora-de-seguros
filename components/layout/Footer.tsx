import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";
import { Logo } from "@/components/layout/Logo";
import { MapPinIcon, PhoneIcon, EmailIcon } from "@/components/ui/Icons";

type FooterNavSection = {
  heading: string;
  contact?: string;
  faqs?: string;
  claims?: string;
  clientSupport?: string;
  privacy?: string;
  terms?: string;
  cookies?: string;
  disclaimer?: string;
  arseg?: string;
  compliance?: string;
  aml?: string;
  notice?: string;
  about?: string;
  partners?: string;
  reinsurance?: string;
  solutions?: string;
};

type FooterDict = {
  brand: string;
  brandSubtitle: string;
  nav: {
    home: string;
    about: string;
    services: string;
    personal: string;
    business: string;
    reinsurance: string;
    contact: string;
  };
  footer: {
    address: string;
    phoneLabel: string;
    emailLabel: string;
    rights: string;
    tagline: string;
    builtBy: string;
    partner: string;
    partnerUrl: string;
    institutional: string;
    support: FooterNavSection;
    legal: FooterNavSection;
    regulatory: FooterNavSection;
    corporate: FooterNavSection;
  };
};

function FooterNavColumn({
  section,
  links,
}: {
  section: FooterNavSection;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <nav>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-azure">
        {section.heading}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm text-brand-ivory/75">
        {links.map(({ label, href, external }) => (
          <li key={href}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-ivory"
              >
                {label}
              </a>
            ) : (
              <Link href={href} className="transition-colors hover:text-brand-ivory">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: FooterDict;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-navy text-brand-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-brand-azure/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-mid/30 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:py-20">
        {/* Top section: brand + nav columns */}
        <div className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2.5"
              aria-label={dict.brand}
            >
              <Logo size={44} />
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight">
                  {dict.brand}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-azure">
                  {dict.brandSubtitle}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-brand-ivory/70">
              {dict.footer.tagline}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-brand-ivory/70">
              <li className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-azure" />
                <span>{dict.footer.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-azure" />
                <span className="flex flex-col gap-0.5">
                  <a href="tel:+244921545832" className="transition-colors hover:text-brand-ivory">
                    +244 921 545 832
                  </a>
                  <a href="tel:+244923254449" className="transition-colors hover:text-brand-ivory">
                    +244 923 254 449
                  </a>
                  <a href="tel:+244946451069" className="transition-colors hover:text-brand-ivory">
                    +244 946 451 069
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <EmailIcon className="h-4 w-4 flex-shrink-0 text-brand-azure" />
                <a
                  href="mailto:detondocorretoraseguros@gmail.com"
                  className="break-all transition-colors hover:text-brand-ivory"
                >
                  detondocorretoraseguros@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <FooterNavColumn
            section={dict.footer.support}
            links={[
              { label: dict.footer.support.contact!, href: `/${lang}/contact` },
              { label: dict.footer.support.faqs!, href: `/${lang}/contact` },
              { label: dict.footer.support.claims!, href: `/${lang}/contact` },
              { label: dict.footer.support.clientSupport!, href: `/${lang}/contact` },
            ]}
          />

          {/* Legal */}
          <FooterNavColumn
            section={dict.footer.legal}
            links={[
              { label: dict.footer.legal.privacy!, href: `/${lang}/privacy-policy` },
              { label: dict.footer.legal.terms!, href: `/${lang}/terms` },
              { label: dict.footer.legal.cookies!, href: `/${lang}/cookies` },
              { label: dict.footer.legal.disclaimer!, href: `/${lang}/disclaimer` },
            ]}
          />

          {/* Regulatory & Compliance */}
          <FooterNavColumn
            section={dict.footer.regulatory}
            links={[
              { label: dict.footer.regulatory.arseg!, href: "https://www.arseg.ao", external: true },
              { label: dict.footer.regulatory.compliance!, href: `/${lang}/contact` },
              { label: dict.footer.regulatory.aml!, href: `/${lang}/contact` },
              { label: dict.footer.regulatory.notice!, href: `/${lang}/contact` },
            ]}
          />

          {/* Corporate */}
          <FooterNavColumn
            section={dict.footer.corporate}
            links={[
              { label: dict.footer.corporate.about!, href: `/${lang}/about` },
              { label: dict.footer.corporate.partners!, href: `/${lang}/about` },
              { label: dict.footer.corporate.reinsurance!, href: `/${lang}/services/reinsurance` },
              { label: dict.footer.corporate.solutions!, href: `/${lang}/services/business` },
            ]}
          />
        </div>

        {/* Institutional divider */}
        <div className="mt-14 border-t border-brand-ivory/10 pt-8">
          <p className="max-w-3xl text-sm leading-6 text-brand-ivory/60 italic">
            {dict.footer.institutional}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-brand-ivory/10 pt-6 text-xs text-brand-ivory/40 sm:flex-row sm:items-center">
          <p>
            &copy; {year} {dict.brand}, Corretora de Seguros, Lda. {dict.footer.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{dict.footer.builtBy}</span>
            <a
              href={dict.footer.partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-extrabold tracking-tight text-brand-gradient transition-opacity hover:opacity-90 sm:text-lg"
            >
              {dict.footer.partner}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

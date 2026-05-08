import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";
import { Logo } from "@/components/layout/Logo";
import { MapPinIcon, PhoneIcon, EmailIcon } from "@/components/ui/Icons";

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
    madeIn: string;
  };
};

export function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: FooterDict;
}) {
  const year = 2018
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
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
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
            <p className="mt-5 max-w-sm text-sm leading-6 text-brand-ivory/70">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-azure">
              {dict.nav.services}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-ivory/75">
              <li>
                <Link
                  href={`/${lang}/services/personal`}
                  className="transition-colors hover:text-brand-ivory"
                >
                  {dict.nav.personal}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services/business`}
                  className="transition-colors hover:text-brand-ivory"
                >
                  {dict.nav.business}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services/reinsurance`}
                  className="transition-colors hover:text-brand-ivory"
                >
                  {dict.nav.reinsurance}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-azure">
              {dict.brand}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-ivory/75">
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="transition-colors hover:text-brand-ivory"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services`}
                  className="transition-colors hover:text-brand-ivory"
                >
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="transition-colors hover:text-brand-ivory"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-azure">
              {dict.nav.contact}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-brand-ivory/75">
              <li className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-azure" />
                <span>{dict.footer.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-5 w-5 flex-shrink-0 text-brand-azure" />
                <span className="flex flex-col">
                  <a
                    href="tel:+244921545832"
                    className="transition-colors hover:text-brand-ivory"
                  >
                    +244 921 545 832
                  </a>
                  <a
                    href="tel:+244990120689"
                    className="transition-colors hover:text-brand-ivory"
                  >
                    +244 990 120 689
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <EmailIcon className="h-5 w-5 flex-shrink-0 text-brand-azure" />
                <a
                  href="mailto:geral@detondocorretora.com"
                  className="transition-colors hover:text-brand-ivory"
                >
                  geral@detondocorretora.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-brand-ivory/10 pt-6 text-xs text-brand-ivory/50 sm:flex-row sm:items-center">
          <p>
            © {year} {dict.brand} — Corretora de Seguros, Lda. {dict.footer.rights}
          </p>
          <p>{dict.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

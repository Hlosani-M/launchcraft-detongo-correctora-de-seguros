import { headers } from "next/headers";
import Link from "next/link";
import { getDictionary, DEFAULT_LOCALE, LOCALES } from "./dictionaries";
import { Section } from "@/components/ui/Section";
import { LinkButton, ArrowIcon } from "@/components/ui/Button";

export default async function LocaleNotFound() {
  const heads = await headers();

  // Infer locale from headers that may contain the request path.
  // Falls back to DEFAULT_LOCALE when no path header is present.
  const candidates = [heads.get("x-invoke-path"), heads.get("referer")];
  let lang = DEFAULT_LOCALE;
  for (const candidate of candidates) {
    if (!candidate) continue;
    const found = LOCALES.find(
      (l) => candidate.includes(`/${l}/`) || candidate.endsWith(`/${l}`),
    );
    if (found) {
      lang = found;
      break;
    }
  }

  const dict = await getDictionary(lang);

  return (
    <Section tone="navy" containerClassName="max-w-3xl">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-azure">
        404
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-brand-ivory/75">
        {dict.notFound.description}
      </p>
      <div className="mt-8">
        <LinkButton href={`/${lang}`} variant="primary">
          {dict.notFound.cta}
          <ArrowIcon />
        </LinkButton>
      </div>
    </Section>
  );
}

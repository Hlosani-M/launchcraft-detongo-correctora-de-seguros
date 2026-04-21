import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function LocaleNotFound() {
  return (
    <Section tone="navy" containerClassName="max-w-3xl">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-azure">
        404
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Página não encontrada · Page not found
      </h1>
      <p className="mt-4 text-base leading-7 text-brand-ivory/75">
        A página que procura não existe. The page you are looking for does not
        exist.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/pt"
          className="inline-flex items-center gap-2 rounded-full bg-brand-azure px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-azure-bright"
        >
          Voltar ao início
        </Link>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/25 px-6 py-3 text-sm font-semibold text-brand-ivory transition-colors hover:bg-brand-ivory/10"
        >
          Go to homepage
        </Link>
      </div>
    </Section>
  );
}

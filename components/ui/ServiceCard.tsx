import Link from "next/link";
import { ArrowIcon } from "./Button";

type Tone = "light" | "dark";

type ServiceCardProps = {
  name: string;
  description?: string;
  href?: string;
  cta?: string;
  icon?: React.ReactNode;
  tone?: Tone;
  className?: string;
};

export function ServiceCard({
  name,
  description,
  href,
  cta,
  icon,
  tone = "light",
  className = "",
}: ServiceCardProps) {
  const container =
    tone === "dark"
      ? "bg-brand-navy/70 ring-brand-ivory/10 text-brand-ivory hover:ring-brand-azure/50"
      : "bg-white ring-brand-slate/15 text-brand-navy hover:ring-brand-azure hover:-translate-y-1";

  const descColor =
    tone === "dark" ? "text-brand-slate-soft" : "text-brand-slate";

  const body = (
    <div
      className={`group relative flex h-full flex-col rounded-2xl p-7 ring-1 shadow-[var(--shadow-soft)] transition-all duration-300 ${container} ${className}`}
    >
      {icon ? (
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-azure/15 text-brand-azure">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
        {name}
      </h3>
      {description ? (
        <p className={`mt-3 text-sm leading-6 ${descColor}`}>{description}</p>
      ) : null}
      {href && cta ? (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-azure transition-transform group-hover:gap-2.5">
          {cta}
          <ArrowIcon />
        </span>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {body}
      </Link>
    );
  }
  return body;
}

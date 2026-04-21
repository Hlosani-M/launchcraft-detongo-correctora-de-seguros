export function ValuePill({
  name,
  description,
  index,
}: {
  name: string;
  description: string;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:ring-brand-azure">
      <span
        aria-hidden
        className="absolute right-5 top-5 text-xs font-mono font-semibold text-brand-slate/50 transition-colors group-hover:text-brand-azure"
      >
        {num}
      </span>
      <div className="mb-4 h-1 w-10 rounded-full bg-brand-azure" />
      <h3 className="text-lg font-semibold tracking-tight text-brand-navy">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-brand-slate">{description}</p>
    </article>
  );
}

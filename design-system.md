# Detondo Design System

A compact reference for the tokens, type scale, and component conventions used across the Detondo marketing site. Tokens live in `app/globals.css` under `@theme inline` (Tailwind v4) — there is no separate `tailwind.config`.

## Brand palette

| Token | Hex | Role |
| --- | --- | --- |
| `brand-azure` | `#05BBFB` | Primary accent, CTA fill, highlights |
| `brand-azure-bright` | `#2CCFFF` | Hover state for `brand-azure` |
| `brand-azure-dim` | `#0399D1` | Links against ivory |
| `brand-navy` | `#171A35` | Dark surfaces, headings |
| `brand-navy-deep` | `#0C0E22` | Gradient anchor |
| `brand-mid` | `#225577` | Secondary navy tint |
| `brand-deep` | `#143657` | Gradient midpoint |
| `brand-slate` | `#7D808C` | Body copy on light surfaces |
| `brand-slate-soft` | `#C7C9D0` | Body copy on navy surfaces |
| `brand-ivory` | `#FBFCFC` | Default page background |
| `brand-surface` | `#F2F5F8` | Subtle contrast panel |

## Gradients & utilities

Defined in `globals.css`:

- `.bg-brand-gradient` — deep navy linear gradient.
- `.bg-hero-gradient` — navy gradient overlaid with azure + mid-navy radial washes (hero, category heros).
- `.text-brand-gradient` — azure → ivory text clip for emphasis.
- `.hairline` — 1px horizontal divider that fades at its edges.

## Type scale

The repo loads **Geist Sans** and **Geist Mono** via `next/font/google`.

| Usage | Tailwind classes |
| --- | --- |
| Hero h1 | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight` |
| Section h2 | `text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight` |
| Subsection h3 | `text-lg sm:text-xl font-semibold tracking-tight` |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.2em]` |
| Body | `text-base leading-7 sm:text-lg` |
| Meta/caption | `text-sm leading-6` |

## Spacing

We stick to Tailwind's 4-pt scale. Section vertical rhythm is always `py-20 sm:py-24 lg:py-32`. Card padding is `p-6 sm:p-7` (with `p-8 sm:p-10` for hero/feature cards). Gaps between grid items default to `gap-5` / `gap-6`.

## Radii & shadows

- `rounded-full` — buttons, chips, pill stats
- `rounded-2xl` — cards
- `rounded-3xl` — feature panels, hero inserts
- `shadow-[var(--shadow-soft)]` — the standard card drop shadow
- `ring-1 ring-brand-slate/15` — card hairline border; hover elevates to `ring-brand-azure`

## Buttons (`components/ui/Button.tsx`)

| Variant | Use |
| --- | --- |
| `primary` | Main call to action. Azure fill, navy text, azure glow. |
| `secondary` | Alternative dark CTA. Navy fill, ivory text. |
| `ghost` | Low-emphasis inline actions. |
| `outline-light` | CTA over navy/hero surfaces. |

Sizes: `md` (px-5 py-2.5) and `lg` (px-7 py-3.5). Always render an `ArrowIcon` as the affordance for forward navigation.

## Signature motif

The azure parallelogram from the company presentation is reproduced as `ParallelogramAccent`. It is purely decorative (`aria-hidden`) and is layered behind hero sections with controlled opacity. `BrandDiamond` is the diamond mark used in the Header / Footer next to the wordmark.

## Cards

All cards share a common recipe: `rounded-2xl bg-white p-7 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]`. Hover interaction: `hover:-translate-y-1 hover:ring-brand-azure`. Dark-tone cards use `bg-brand-navy text-brand-ivory` and swap the ring for `ring-brand-ivory/10`.

## Motion

Framer Motion v12. Three primitives:

1. **`Reveal`** — scroll-triggered fade + 24px lift, 0.6s ease-out, runs once. The default wrapper for every section.
2. **`Hero`** — staggered entrance on mount (100ms stagger, 700ms per child).
3. **`Testimonials`** — `AnimatePresence` crossfade/slide, 4-second autoplay that pauses when the user interacts.

Every animation respects `useReducedMotion()`; the global `prefers-reduced-motion` rule in `globals.css` also snips transition durations as a safety net.

## Accessibility conventions

- Headings descend in order — only one `<h1>` per page.
- Every decorative SVG is `aria-hidden`.
- Navigation uses `aria-current="true"` for the active item.
- Form fields wire `aria-invalid` + `aria-describedby` to their error messages.
- All interactive elements pass through the global `:focus-visible` outline (2px azure).
- The skip-link in `app/[lang]/layout.tsx` lands on `#main`.

## Adding new components

1. Prefer composing `Section`, `Reveal`, and one of the card recipes above before styling from scratch.
2. If the component ships new colours, add them to `@theme inline` — don't introduce ad-hoc hex values in markup.
3. Client components (motion, state) go under `components/` with `"use client"` at the top; everything else stays a Server Component and receives strings as props.

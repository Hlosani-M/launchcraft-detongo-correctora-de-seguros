@AGENTS.md

# Detondo — Project Operating Manual

Detondo is a **bilingual (`pt`, `en`) marketing site**. Full translation parity across every supported locale is a **release-blocking requirement**. Every rule below exists to keep that contract.

This file is read on every session. Keep it lean. Point at `README.md`, `design-system.md`, and `AGENTS.md` instead of duplicating them.

---

## 1. Supported locales

- Declared in one place: `LOCALES = ["pt", "en"]` in `app/[lang]/dictionaries.ts`. `DEFAULT_LOCALE = "pt"`.
- Dictionaries: `app/[lang]/dictionaries/pt.json` and `app/[lang]/dictionaries/en.json`. They MUST share identical top-level keys at every depth.
- `hasLocale(value)` is the only accepted runtime type-guard for incoming `params.lang`.
- Adding a third locale = add the JSON file, append to `LOCALES`, extend `generateStaticParams`, extend `generateMetadata().alternates.languages`, extend `app/sitemap.ts`. If you touch one, touch them all.

## 2. The bilingual contract (non-negotiable)

- Every user-facing string change in one language **must** land in the same commit with its counterpart(s) in every other supported locale. No follow-up PRs, no TODOs, no placeholders.
- Covered surfaces (not exhaustive — treat as defaults): page copy, headings, eyebrows, descriptions, nav labels, buttons, CTAs, form labels / placeholders / hints / validation / success / error messages, toasts, modals, email templates, page `<title>` + `description`, OG tags, JSON-LD fields, sitemap alternates, 404 / not-found copy, legal / policy content, `aria-label`s, `alt` text.
- No hardcoded user-visible Portuguese or English strings in `.tsx`/`.ts` files. If you catch yourself typing `"Enviar"` or `"Submit"` in a component, stop and route it through the dictionary.
- Server-side validation errors use **locale-agnostic keys** (e.g. `"name"`, `"email"`, `"message"`). The client maps them through `dict.contact.form.errors.*`. Follow this pattern for any new validated form.
- If a string is genuinely locale-invariant (brand name, phone number, SKU, HTML tag), still run it through the dictionary when it sits next to translated text so future edits don't drift.

## 3. Where strings live

| Surface | Canonical location |
| --- | --- |
| UI copy | `app/[lang]/dictionaries/{pt,en}.json` |
| Page `<title>` / `description` | `dict.meta.*` consumed in each route's `generateMetadata` |
| OG `locale`, alternates, canonicals | `app/[lang]/layout.tsx` and each page's `generateMetadata` |
| Sitemap hreflang | `app/sitemap.ts` (enumerates `LOCALES × ROUTES`) |
| Structured data | `lib/jsonld.tsx` — set `inLanguage` from `lang`, localize human-readable fields from `dict` |
| Form validation error codes | `lib/schemas.ts` (codes) + `dict.contact.form.errors.*` (copy) |
| Locale switching | `components/layout/LocaleSwitcher.tsx` — swaps path segment only |

Rules of thumb: server components call `getDictionary(lang)` and pass typed slices down. Client components (`Header`, `Footer`, `ContactForm`, `Testimonials`) accept `dict` as a prop — never import dictionaries directly.

## 4. Required workflow for every change

Before marking any task complete, run through this checklist:

- [ ] Did this change touch any user-facing text, label, aria attribute, alt text, metadata, SEO field, structured data, or email template?
- [ ] If yes: updated `pt.json` **and** `en.json` (and every other locale) in this change — same keys, same shape, same nesting depth.
- [ ] Checked navigation, buttons, forms, validation, alerts, success / error states, metadata, OG, JSON-LD, sitemap, and `alternates.languages` for parity on touched routes.
- [ ] Confirmed the language switcher still lands on the equivalent URL in the other locale (no 404 after swap).
- [ ] Grepped the diff for hardcoded pt/en strings (`rg "\b(Enviar|Submit|Saber mais|Learn more|Voltar|Back)\b" -t tsx -t ts`). Replace any hit with a dictionary key.
- [ ] If a translation key was added, removed, or renamed, the same operation happened in every locale file.
- [ ] If a per-locale duplicated page exists (e.g. a future localized slug), both versions are aligned.
- [ ] `npm test` passes — `tests/dictionaries.test.ts` fails loudly on top-level key drift and is the first line of defence.
- [ ] `npm run build` passes — typed metadata / route types / JSON-LD all rebuild cleanly.
- [ ] Smoke-tested both `/pt/<route>` and `/en/<route>` in `npm run dev` for any UI you changed.

A PR with only one language updated is not "done" — it's a defect.

## 5. Patterns to reuse (don't reinvent)

- **Layout / sections**: `components/ui/Section.tsx` + `components/ui/Reveal.tsx`. New sections receive a typed dictionary slice as a prop.
- **Buttons / CTAs**: `components/ui/Button.tsx` (`LinkButton`, `ArrowIcon`). Don't build bespoke button styles.
- **Forms**: mirror `components/forms/ContactForm.tsx` — server action + Zod schema (locale-agnostic error codes) + `useActionState` + dictionary-driven labels and error copy.
- **Page scaffolding**: mirror `app/[lang]/about/page.tsx` or `app/[lang]/services/page.tsx` — await `props.params`, guard with `hasLocale`, load `getDictionary`, export `generateMetadata` that fills `alternates.languages` for every locale.
- **Server-only modules**: anything in `lib/email/` or the dictionaries must keep the `import "server-only"` barrier. Tests stub it via `tests/stubs/server-only.ts`.
- **Design tokens**: colours, radii, shadows — see `design-system.md`. Never inline hex values.
- **Motion**: wrap reveals in `Reveal`; always respect `useReducedMotion()` and the global `prefers-reduced-motion` rule in `globals.css`.

## 6. When adding new surfaces

Adding any of the following **requires the bilingual wiring in the same change** — no exceptions:

- New page or route → `generateMetadata` with localized title/description + `alternates.languages` for every locale; add to `app/sitemap.ts`.
- New component with user-facing text → dictionary keys in every `*.json`, passed in as props.
- New form → Zod schema with locale-agnostic error codes; dictionary entries for labels, placeholders, hints, submit/loading text, success/error titles and bodies, per-field error messages.
- New email or template → decide whether content is staff-facing (single language, document the choice) or user-facing (localize via `message.locale`); update all adapters that render it.
- New CTA / nav item → dictionary keys under `common.cta.*` or `common.nav.*` in every locale; wire through `Header`, `Footer`, `LocaleSwitcher` as relevant.
- New SEO field / structured data property → add to `lib/jsonld.tsx` and localize human-readable values from `dict`.
- Legal / policy content → full translations at the moment of introduction; never ship English-only.

## 7. Engineering hygiene

- Follow existing architecture before introducing new layers. Reuse `Section`, `Reveal`, `ServiceCard`, etc. before writing new primitives.
- Make the **smallest safe change** when fixing bugs — but still update every locale. Scope creep and stale translations are equally bad.
- No premature abstractions, no backwards-compat shims, no speculative config flags.
- No comments that narrate the task, issue number, or caller. Comments justify non-obvious *why*.
- Respect the Next 16 APIs: async `params` / `searchParams`, `PageProps<...>` / `LayoutProps<...>` globals, `proxy.ts` (not `middleware.ts`), Server Actions for mutations. If uncertain, re-read `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` and siblings before writing code (per `AGENTS.md`).
- Keep `CLAUDE.md`, `README.md`, and `design-system.md` in sync but non-duplicative.

## 8. Known drift — fix when you next touch these files

These slipped through the initial build. They are not separate tasks — fix each the next time a change lands in the same file.

- `components/sections/Testimonials.tsx` — hardcoded Portuguese `aria-label`s (`Testemunho ${i + 1}`, `Anterior`, `Próximo`). Route them through `dict.testimonials.a11y.*` (add the keys to both dictionaries).
- `app/[lang]/not-found.tsx` — bilingual side-by-side text is hardcoded. The route has `lang`; use `getDictionary(lang)` and render `dict.notFound.*` (keys already exist in both dictionaries).
- `lib/email/provider.ts` — `renderContactText` / `renderContactHtml` field labels are English-only. Either localize via `message.locale` or document in that file the deliberate decision to keep it English for internal staff and update this bullet when done.

The top-level `app/not-found.tsx` is allowed to stay bilingual-at-once because it renders before any locale is known. Do not "fix" it.

## 9. Verification before completion

```bash
npm run typecheck
npm test          # tests/dictionaries.test.ts enforces key parity
npm run build
npm run dev       # manually hit /pt and /en on every touched route
```

## 10. Pointers

- `AGENTS.md` — Next 16 reading habit. Heed deprecation notices.
- `README.md` — env vars, scripts, email provider swap, deployment.
- `design-system.md` — tokens, type scale, component recipes.
- `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` — canonical i18n guide for the Next 16 version in use.

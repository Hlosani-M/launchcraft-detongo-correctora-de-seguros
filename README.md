# Detondo Corretora de Seguros — Website

Bilingual (Portuguese / English) marketing site for **Detondo**, an Angolan insurance and reinsurance brokerage headquartered in Luanda.

Built on **Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript**. The content is delivered from native i18n dictionaries, the contact form ships as a Server Action, and email delivery sits behind a SOLID provider abstraction (Brevo by default).

## Requirements

- Node.js **≥ 20.9**
- npm 10+ (or pnpm / bun — scripts are package-manager agnostic)

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the secrets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root proxy redirects to `/pt` or `/en` based on the browser's `Accept-Language`.

## Scripts

| script | purpose |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint (Next.js preset) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (one-shot) |
| `npm run test:watch` | Vitest (watch) |

## Environment variables

See `.env.example` for the full list. The three you will always want:

```
NEXT_PUBLIC_SITE_URL=https://detondocorretora.com
EMAIL_PROVIDER=brevo
CONTACT_TO_EMAIL=geral@detondocorretora.com
CONTACT_FROM_EMAIL=noreply@detondocorretora.com
BREVO_API_KEY=xkeysib-...
```

Optional:

- `NEXT_PUBLIC_GA_ID` — GA4 Measurement ID. GA is only loaded when this is set and `NODE_ENV === "production"`.
- `CONTACT_FROM_NAME` — display name for outbound email.

### Swapping the email provider

`lib/email/factory.ts` picks an adapter from `EMAIL_PROVIDER`. Supported kinds:

| `EMAIL_PROVIDER` | required env | notes |
| --- | --- | --- |
| `brevo` *(default)* | `BREVO_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Uses `fetch` — zero extra deps. |
| `resend` | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | |
| `sendgrid` | `SENDGRID_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | |
| `smtp` | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | `npm install nodemailer` first (loaded lazily). |
| `console` | — | Dev-only fallback: logs the payload, does not send. |

To add a new provider, implement `EmailProvider` (`lib/email/provider.ts`) and add a branch to the factory. Nothing else in the app references the vendor directly — that is the point of the abstraction.

## Routing

| path | description |
| --- | --- |
| `/pt`, `/en` | Home |
| `/{lang}/about` | Company |
| `/{lang}/services` | Services hub |
| `/{lang}/services/personal` | Personal lines |
| `/{lang}/services/business` | Commercial lines |
| `/{lang}/services/reinsurance` | Reinsurance + life/health + treaty |
| `/{lang}/contact` | Contact form |

Root `/` is handled by `proxy.ts`, which reads `Accept-Language` and redirects to the best match (fallback `pt`).

## Project layout

```
app/
  [lang]/            # locale-scoped routes; real root layout lives here
    dictionaries/    # pt.json, en.json
    dictionaries.ts  # server-only loader + Locale type
    actions.ts       # contactAction (Server Action)
    layout.tsx       # <html lang>, fonts, Header/Footer, JSON-LD
    page.tsx         # Home
    about/
    services/        # hub + [category]
    contact/
  not-found.tsx      # top-level 404
  sitemap.ts
  robots.ts
  globals.css        # Tailwind v4 @theme inline brand tokens
components/
  forms/             # ContactForm
  layout/            # Header, Footer, LocaleSwitcher
  sections/          # Hero, WhoWeAre, Vision, Commitment, Personal, Business, Reinsurance, Treaty, Testimonials, CtaBand
  ui/                # Section, Reveal, Accordion, Button, ServiceCard, ValuePill, Icons, ParallelogramAccent
lib/
  email/             # provider interface, adapters, factory
  jsonld.tsx         # Organization / InsuranceAgency JSON-LD
  schemas.ts         # zod contact schema
proxy.ts             # Next 16 middleware replacement
```

## Email provider architecture

The flow from the Server Action:

```
ContactForm → contactAction() → zod contactSchema
                                → getEmailProvider() : EmailProvider
                                → provider.sendContactMessage(msg)
```

Each adapter is constructed by the factory from `process.env`; consumers never import Brevo, Resend, etc. directly. Tests in `tests/email-factory.test.ts` and `tests/contact-action.test.ts` exercise the contract by substituting a mock `EmailProvider` — a concrete demonstration of Liskov Substitution at work.

## Testing

Vitest runs in jsdom with a path alias matching `tsconfig.json`:

```bash
npm test              # one-shot
npm run test:watch    # watch
```

Current coverage:

- `tests/dictionaries.test.ts` — both locales load, share the same top-level keys, and expose required strings.
- `tests/email-factory.test.ts` — factory selects the right adapter per `EMAIL_PROVIDER`, validates required env vars, and rejects unknown kinds.
- `tests/contact-action.test.ts` — Server Action accepts valid input, flags invalid input, silently drops honeypot submissions, and handles provider failures.

## Internationalisation

- Dictionaries live at `app/[lang]/dictionaries/{pt,en}.json` and are loaded via dynamic `import()` so each locale is its own chunk.
- Every page is a Server Component — copy is resolved on the server and passed to client components (Header, ContactForm, Testimonials) as props; there is no client-side i18n Context to hydrate.
- `LocaleSwitcher` flips only the first path segment, preserving the current route.
- `generateStaticParams` emits both locales for SSG.

## Accessibility

- Skip link renders on first tab.
- Header menu trap with focus-visible outline, `aria-expanded`, `aria-controls`.
- Every decorative SVG (including the parallelogram motif) is marked `aria-hidden`.
- Framer Motion respects `prefers-reduced-motion` via `useReducedMotion()`.
- Form inputs carry `aria-invalid` + `aria-describedby` wiring for error messages.

## Security

`next.config.ts` sets a conservative CSP plus `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, and a zero-feature `Permissions-Policy`. The CSP allows only Google Analytics/Tag Manager (+ the Brevo API) in `connect-src`; swap in your provider's origin if you change `EMAIL_PROVIDER`.

Contact submissions are validated with Zod on the server and silently absorb honeypot-triggered payloads. To layer on reCAPTCHA or Turnstile later, add a hidden token input to `ContactForm` and verify it before calling `getEmailProvider()` in `contactAction`.

## Design system

See [`design-system.md`](./design-system.md) for colour tokens, spacing, type scale, and component conventions.

## Out of scope for v1

The following were deferred because the client has not yet provided content or assets:

- Blog / knowledge base
- Downloadable PDF brochures
- Leadership photos, certifications, timeline on `/about`
- Photography (the site uses CSS + SVG brand motifs only)

Adding any of these later should not require changes to the routing or i18n layers.

## Deploy

The site deploys as a standard Next.js app — Vercel, Netlify, Cloudflare Pages, or any Node host. Make sure the environment variables above are set in the target environment before the first build.

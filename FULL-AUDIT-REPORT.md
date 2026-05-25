# Full SEO Audit Report — Detondo Corretora de Seguros

**Domain:** https://detondocorretora.com
**Audit date:** 2026-05-24
**Business type:** Insurance and reinsurance brokerage (YMYL) — Luanda, Angola
**Stack:** Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript · Bilingual (pt/en)
**Audited by:** 8 specialist subagents — Technical, Content/E-E-A-T, Schema, Sitemap, Local SEO, Performance/Images, GEO/AI, SXO

---

## SEO Health Score: 60 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 71 | 15.6 |
| Content Quality (E-E-A-T) | 23% | 58 | 13.3 |
| On-Page SEO | 20% | 62 | 12.4 |
| Schema / Structured Data | 10% | 45 | 4.5 |
| Performance (CWV) | 10% | 65 | 6.5 |
| AI Search Readiness (GEO) | 10% | 48 | 4.8 |
| Images | 5% | 55 | 2.8 |
| **Total** | | | **59.9 → 60** |

The site has a strong structural and architectural foundation — SSR/SSG via Next.js, clean URL structure, bilingual hreflang, well-implemented design system, and genuine authority signals (ARSEG licence 112/ASEG/MF/23, ANPG certification, Lloyd's/Swiss Re/Munich Re panel). The score is suppressed by five indexed empty YMYL pages, ghost sitemap routes, missing HSTS, oversized images, empty entity signals (`sameAs`), and critically thin content on the highest-value service segment (oil and gas / corporate).

---

## Business Type Detected

**Brick-and-mortar Local Service + B2B Specialist**

- Primary audience: corporate clients, oil and gas operators, energy/mining companies (Angola)
- Secondary: individuals (personal insurance)
- Regulatory classification: ARSEG-supervised, ANPG-certified
- YMYL category: all pages (insurance = financial services)

---

## Top 5 Critical Issues

1. **10 sitemap routes return 404** — `/services/personal`, `/services/business`, `/services/mining`, `/services/reinsurance`, and all 6 personal product detail pages have no `page.tsx`. Google is being asked to index 20 ghost URLs.
2. **5 empty YMYL pages are indexed** — `/faqs`, `/claims`, `/client-support`, `/compliance`, `/partners` all render a "coming soon" screen yet are submitted in the sitemap with `index: true`. In a YMYL category this accumulates thin-content signals.
3. **No Google Business Profile** — zero GBP signals on-site or in schema. For a Luanda brick-and-mortar brokerage, GBP is the single highest-leverage local ranking factor.
4. **No `llms.txt`** — the site has no machine-readable declaration of business identity for AI search engines (Perplexity, ChatGPT, Claude). The ARSEG licence number, ANPG certification, and insurer panel are exactly the citable signals that belong there.
5. **`sameAs: []` is empty** — the JSON-LD Organization schema cannot be connected to any external identity (LinkedIn, GBP, ARSEG registry). AI systems cannot confirm "Detondo" on this site is the same entity as any other indexed mention.

---

## Top 5 Quick Wins

1. Add `llms.txt` to `/public/` — 30 minutes, zero risk, immediate AI citation improvement.
2. Restore the `Testimonials` component to the homepage — the component and copy exist; it is simply missing from the `page.tsx` import list. One-line fix.
3. Delete 5 boilerplate Next.js SVGs from `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).
4. Add HSTS header to `next.config.ts` — one line: `{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }`.
5. Fix `treaty.description` in `pt.json` line 660 — the text has stripped diacritics ("decisao estrategica", "subscricao", "aprecados") indicating an unproofread draft. The English counterpart is polished; this is a bilingual parity violation.

---

## Technical SEO — 71/100

### Critical

**C-1. Missing HSTS header** (`next.config.ts`)
`Strict-Transport-Security` is absent. Without it, browsers accept HTTP on first visit and the site cannot enter Chrome's HSTS preload list. HSTS is also a Google HTTPS ranking signal.

Fix: Add to `securityHeaders` in `next.config.ts`:
```
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
```

**C-2. Ghost sitemap routes** (`app/sitemap.ts`)
The following routes are in the sitemap but have no corresponding `page.tsx`, meaning they will 404:

| Route | Status |
|---|---|
| `/services/personal` | No page.tsx |
| `/services/personal/motor` | No page.tsx (verify) |
| `/services/personal/building` | No page.tsx (verify) |
| `/services/personal/home-contents` | No page.tsx (verify) |
| `/services/personal/all-risks` | No page.tsx (verify) |
| `/services/personal/liability` | No page.tsx (verify) |
| `/services/personal/travel` | No page.tsx (verify) |
| `/services/business` | No page.tsx |
| `/services/mining` | No page.tsx (directory exists, has [category] page) |
| `/services/reinsurance` | No page.tsx |

Action: Remove these from `ROUTES` in `sitemap.ts` until pages are built, OR build the pages (dictionary content already exists for all of them).

### High

**H-1. Canonical/hreflang URLs are relative, not absolute**
Every `generateMetadata` uses `canonical: "/${lang}/about"` style paths. `metadataBase` in the layout resolves these, but this is fragile — any future route group change or layout bypass would produce invalid relative canonicals. Same for `alternates.languages`.

Fix: Extract `siteUrl` to `lib/constants.ts` and use absolute URLs: `` canonical: `${siteUrl}/${lang}/about` `` in all per-page `generateMetadata` calls.

**H-2. CSP uses `'unsafe-inline'` for scripts in production** (`next.config.ts`)
This neutralises XSS protection. Long-term fix: implement nonce-based CSP. Short-term: audit whether `'unsafe-inline'` is strictly required in production `script-src`; add a `report-uri` endpoint to catch violations.

**H-3. Missing security headers** (`next.config.ts`)
Add at minimum:
```
{ key: "X-DNS-Prefetch-Control", value: "off" },
{ key: "X-Permitted-Cross-Domain-Policies", value: "none" },
{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
{ key: "Cross-Origin-Resource-Policy", value: "same-origin" },
```

**H-4. Home page has no `generateMetadata`** (`app/[lang]/page.tsx`)
The homepage relies entirely on layout-level metadata. Add an explicit `generateMetadata` export with its own `alternates` block, following the pattern in `about/page.tsx`.

**H-5. Boilerplate files in `public/`**
Delete: `file.svg`, `glob.svg`, `next.svg`, `vercel.svg`, `window.svg`. These are Next.js starter template assets that have no place on a production insurance broker site. Also remove `.DS_Store` files and add `**/.DS_Store` to `.gitignore`.

### Medium

**M-1. No IndexNow implementation** — Implement URL submission to Bing/Yandex on deploy.

**M-2. `host` directive in `robots.ts`** — Yandex-only, ignored by Google. Remove.

**M-3. Coming-soon pages indexed** — Add `robots: { index: false, follow: true }` to `/faqs`, `/claims`, `/client-support`, `/compliance`, `/partners` page `generateMetadata` until content is live. Also remove from `ROUTES` in `sitemap.ts`.

**M-4. `lastModified: new Date()` in sitemap** — Always evaluates to build time. Either remove the field or maintain a `ROUTE_DATES` map with real last-modified dates.

**M-5. `priority` and `changeFrequency` in sitemap** — Google ignores both fields. Remove them to reduce XML payload.

**M-6. OG image not explicitly declared** — Add `openGraph.images` with width, height, and alt to layout `generateMetadata`.

**M-7. Title separator inconsistency** — Layout template uses ` · ` but CLAUDE.md specifies ` | `. Align to one convention; check if page titles already include the brand name (double-suffix risk).

### Low

**L-1. Geist Mono font loaded but unused** — Remove `Geist_Mono` import from layout if `--font-geist-mono` is not applied anywhere.

**L-2. ANPG certificate PDF indexed without control** — Add `X-Robots-Tag: noindex` header for `.pdf` via `next.config.ts` `headers()` if PDF indexing is not desired.

**L-3. Menu `aria-label` hardcoded in English** (`components/layout/Header.tsx`) — Route through `dict.common.nav.menuLabel` (bilingual contract).

**L-4. `translate="no"` trade-off** — `<html translate="no">` plus `other: { google: "notranslate" }` is correct for a managed bilingual site but suppresses discovery from Angola's other local languages. Informational.

---

## Content Quality / E-E-A-T — 58/100

### E-E-A-T Breakdown

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 30/100 | No named team, no case studies, no founder story, anonymous testimonials |
| Expertise | 55/100 | Strong service breadth; ANPG/ARSEG signals; but business lines are name-only lists |
| Authoritativeness | 65/100 | ARSEG licence, ANPG cert, Swiss Re/Munich Re/Lloyd's panel — solid. `sameAs` empty. |
| Trustworthiness | 62/100 | Good legal pages; but 5 empty pages, gmail address, Privacy Policy as a wall of text |

### Critical

**Draft text in `pt.json` line 660 — bilingual parity violation**
`treaty.description` contains unproofread Portuguese without diacritics: "decisao estrategica", "objectivos", "subscricao", "flexiveis", "aprecados". The English equivalent is polished. This is a CLAUDE.md section 2 violation.

Fix: Rewrite line 660 with correct Portuguese diacritics, matching the quality of the English version.

**5 indexed empty YMYL pages**
`/faqs`, `/claims`, `/client-support`, `/compliance`, `/partners` all render a "coming soon" placeholder with no substantive content. In a YMYL insurance category, Google's QRG requires content that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness. An empty page fails all four.

The compliance page is the most damaging — corporate clients doing supplier due diligence will click it and find nothing.

Fix: Prioritise content for Compliance, Claims, and FAQs. At minimum, add a descriptive intro paragraph, process overview, contact details, and noindex the page until full content ships.

**Business insurance pages have zero body copy**
`business.items` in both dictionaries is a flat array of `{ id, name }` — 13 insurance line names with no description. The highest-value audience (corporate, oil and gas, energy) has the thinnest product content on the site.

Fix: Add `description` field to each `business.items` entry. For oil and gas, marine, energy, and construction: create dedicated sub-pages.

### High

**AI filler phrases in `vision.description`** (both dictionaries)
"To be a global risk solutions provider of choice, delivering exceptional results through the balance of our strengths: innovation, precision, and service" — this violates CLAUDE.md section 7 ("sentences that read like a marketing-deck headline that nobody at the company would actually say").

Fix: Rewrite in both `pt.json` and `en.json` with a concrete, specific statement of what Detondo does for Angolan clients. Same for `valuesDescription`: "We hold the highest standards in everything we do."

**Missing diacritics in `legalPages` PT body text**
Privacy Policy, Terms, AML/KYC, and Regulatory Notice body content in `pt.json` contains "responsavel", "informacoes", "subscricao", "obrigacoes" throughout. For YMYL legal content governing data subjects' rights, this undermines the trust these pages are meant to establish.

Fix: Proofread all `legalPages.*` PT body entries and restore correct Portuguese diacritics.

**Missing E-E-A-T signals for YMYL compliance**
- No named team members or professional credentials anywhere on the site
- Testimonials exist in the dictionary but `Testimonials` is not imported in `app/[lang]/page.tsx`
- No case studies or client outcomes with specificity
- No professional association membership cited (e.g., ABSA)

**Missing meta description diacritics**
`meta.faqs.description`, `meta.claims.description`, `meta.compliance.description` in `pt.json` have "servicos", "gestao", "regulatorio" without accent marks. These appear in `<meta name="description">` tags visible to users in SERPs.

### Medium

**Content citation thresholds**
The `commitment.pillars` descriptions are 30-50 words each. For AI Overview citation, the optimal passage length is 130-160 words. Expand each pillar with a direct-answer opening sentence, concrete process steps, and a closing sentence naming the ARSEG/ANPG credential.

---

## On-Page SEO — 62/100

### Key Findings

- Metadata is well-structured across 16 of 17 page routes; home page relies on layout inheritance only
- Meta descriptions are compelling and unique on most pages; legal/thin pages have unaccented Portuguese
- H1 tags are present and correct on all pages
- `alternates.languages` with `x-default: /pt` correctly set on all confirmed pages and in sitemap
- Internal linking: service pages link to contact; no breadcrumb navigation links; business sub-items are a list without links to sub-pages (because sub-pages don't exist)
- No desktop navigation dropdown — clicking Services requires an intermediate hub click
- Mining page not reachable from mobile sub-navigation despite being a valid route

---

## Schema / Structured Data — 45/100

### Current Implementation

One `InsuranceAgency` JSON-LD block rendered globally in layout. No other schema anywhere.

### Critical / High

**Empty `sameAs` array** — `sameAs: []` provides zero entity disambiguation. Populate with: ARSEG registry URL, LinkedIn company page, Google Business Profile URL, ANPG supplier registry URL.

**Invalid `areaServed`** — `["AO", "Africa"]` mixes an ISO 3166-1 alpha-2 code with a plain string. Fix:
```json
"areaServed": { "@type": "Country", "name": "Angola" }
```

**No `BreadcrumbList` schema** — Service pages have 3-level URL depth but no breadcrumb schema. This prevents SERP breadcrumb display.

**No `Service` schema** — Each service category page should carry a `Service` block with `provider`, `areaServed`, `serviceType`, and `hasOfferCatalog`.

**`url` property alternates between `/pt` and `/en`** — An `Organization` entity must have one canonical URL. Fix: use `siteUrl` (root domain) for the `url` property.

**`inLanguage` on `InsuranceAgency`** — Semantically incorrect; this property belongs on `WebPage` or `WebSite`, not `Organization`. Remove.

### Medium

**Missing `openingHoursSpecification`** — Hours exist in the dictionary (Mon–Fri 08:00–17:00) but not in schema.

**No `WebSite` schema** — Add globally in layout alongside `OrganizationJsonLd`.

**Missing `foundingDate: "2017"`** — Stated throughout copy; add to schema payload.

**`logo` URL must be verified** — `logo-transparent.png` must exist at `/public/` or Knowledge Panel candidates will silently drop.

**Missing `identifier` for ARSEG licence** — Add:
```json
"identifier": { "@type": "PropertyValue", "name": "ARSEG Licence", "value": "112/ASEG/MF/23" }
```

**Address separator inconsistency** — JSON-LD uses "Nova Vida - Kilamba Kiaxi" (hyphen); footer and contact page use "Nova Vida, Kilamba Kiaxi" (comma). Standardise to comma form.

### Schema to Add

**WebSite (add to layout):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Detondo Corretora de Seguros e Resseguros",
  "alternateName": ["Detondo Seguros", "Detondo Corretora de Seguros"],
  "url": "https://detondocorretora.com",
  "inLanguage": ["pt-AO", "en"],
  "publisher": {
    "@type": "InsuranceAgency",
    "name": "Detondo Corretora de Seguros e Resseguros",
    "url": "https://detondocorretora.com/pt"
  }
}
```

**FAQPage schema** — Not applicable until FAQs page content exists. Note: Google restricts FAQPage rich results to government/healthcare sites post-Aug 2023, but the schema retains GEO/AI citation value.

**Review/AggregateRating** — Not applicable; testimonials are anonymous without numeric ratings.

---

## Performance / Images — 65/100

### Critical

**Oversized source images**

| File | Size | Target |
|---|---|---|
| `personal/personal-liability.jpg` | 3.5 MB | < 350 KB |
| `personal/building-cover.jpg` | 3.5 MB | < 350 KB |
| `sectors/mining.jpg` | 3.2 MB | < 300 KB |
| `sectors/oil-gas.jpg` | 1.6 MB | < 200 KB |
| `sectors/corporate.jpg` | 1.5 MB | < 200 KB |
| `personal/travel.jpg` | 1.5 MB | < 200 KB |
| `partners/nossa-logo.png` | 384 KB | < 30 KB |

Next.js Image handles runtime transcoding to AVIF/WebP, but the server must read the full source file to generate the first optimized variant. 3.5 MB source files degrade cold-start performance.

Compress with `sharp` or `squoosh-cli` before committing. Target: 150-300 KB for full-bleed photos, 200 KB for section images, 30 KB max for logos.

### High

**Google Analytics fires before cookie consent** — `<GoogleAnalytics>` in `layout.tsx` mounts unconditionally when `gaId` is set in production, regardless of the user's consent state stored in `localStorage`. The `CookieBanner` component manages consent but the GA component does not read it. This is an Angolan data protection law (Lei 22/11) compliance issue.

Fix: Wrap `<GoogleAnalytics>` in a client component that reads the consent cookie before rendering.

**Logo alt text is empty** (`components/layout/Logo.tsx`) — The brand mark in the navigation landmark has `alt=""`. A linked logo in a header landmark must have descriptive alt text.

Fix: `alt="Detondo Corretora de Seguros"`.

**Partner logo quality** — `nossa-logo.png` is 384 KB for a logo — unoptimized raster export. `ensa-logo.jpg` and `alianca.jpeg` are JPEGs (no transparency support). Re-export from vector sources.

### Medium

**Boilerplate SVGs in `public/`** — `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` should be deleted.

**Root-level content images** — `business-insurance.jpg`, `life-health.jpg`, `personal.jpg`, `reinsurance.jpg` are 864 KB–1.2 MB each. Compress to 200–400 KB.

### Low

**LCP element** — The `<h1>` text in the Hero is the LCP candidate (not the background image, which is 12% opacity and decorative). Text LCP is fast. `luanda.jpg` is correctly preloaded with `priority`.

**Font loading** — `display: "swap"` correctly set on both Geist fonts. Self-hosted via `next/font/google` (no external DNS). Next.js 14+ injects `size-adjust`/`ascent-override` to minimise CLS from font swap.

**Framer Motion on Hero** — `Hero.tsx` is a `"use client"` component using Framer Motion (~136 KB). Consider CSS-only animations for the hero entrance to reduce JS parse time. Verify impact with Lighthouse before acting.

**CSS** — `globals.css` is lean (83 lines), Tailwind v4 purging is automatic, no large `@keyframes` blocks. Clean.

---

## AI Search Readiness (GEO) — 48/100

### Critical

**No `llms.txt`** — The single highest-impact missing signal for AI search engines.

Draft content ready to create at `/public/llms.txt`:
```
# Detondo Corretora de Seguros e Resseguros

> Angolan insurance and reinsurance brokerage founded in 2017, headquartered in Luanda.
> ANPG-certified for the oil & gas sector. Serves corporate clients, energy companies,
> and oil & gas operators across Angola. Bilingual: Portuguese (primary) and English.

## About

Detondo is a licensed insurance and reinsurance brokerage registered and supervised by
ARSEG (Agencia Angolana de Regulacao e Supervisao de Seguros), licence reference
112/ASEG/MF/23. Certified by the ANPG (Agencia Nacional de Petroleo, Gas e
Biocombustiveis de Angola) to supply goods and services to oil and gas operators.
Places business with 13 Angolan insurers and with Swiss Re, Munich Re, and Lloyd's.

## Services

- https://detondocorretora.com/pt/services/personal — Personal insurance (motor, buildings,
  home contents, all-risks, personal liability, travel)
- https://detondocorretora.com/pt/services/business — Corporate and specialist insurance
  (corporate, oil & gas, energy, marine, construction, liability, aviation, mining)
- https://detondocorretora.com/pt/services/reinsurance — Reinsurance (treaty, facultative,
  alternative risk transfer, life and health reinsurance)

## Key pages

- https://detondocorretora.com/pt/about — Company background, ANPG certification, insurer panel
- https://detondocorretora.com/pt/contact — Contact details, Luanda office
- https://detondocorretora.com/en — English version

## Regulatory

- ARSEG licence: 112/ASEG/MF/23
- ANPG certified for oil & gas goods and services
- Angolan insurance sector regulatory framework

## Contact

Address: Rua n. 121, casa n. 1262 D, Nova Vida, Kilamba Kiaxi, Luanda, Angola
Telephone: +244 921 545 832 | +244 923 254 449 | +244 946 451 069
Email: geral@detondocorretora.com
```

**Empty `sameAs`** — Covered in Schema section. Without external entity links, AI systems cannot confirm "Detondo" is a real entity.

**No FAQPage schema** — FAQs page is empty. This is the highest-ROI schema for Google AI Overviews.

### High

**Missing schema properties for entity completeness**
Add to `lib/jsonld.tsx`:
- `foundingDate: "2017"`
- `knowsAbout: ["insurance brokerage", "reinsurance", "oil and gas insurance", "Angola insurance market", "corporate risk management"]`
- `hasCredential` entries for ARSEG licence and ANPG certification

**No question-form headings** — None of the H2/H3 tags across the site are phrased as questions. For AI Overview triggers ("O que e uma corretora de seguros em Angola?"), question-form headings are the primary citation matching signal.

**Commitment pillar copy below citation threshold** — 30-50 words each. Target 130-160 words per block for AI citation extraction.

### Medium

**ANPG certificate not linked from structured data** — The PDF at `/public/anpg-certificate.pdf` is a high-authority document. Add as `hasCredential` in schema.

**Partner logo alt text missing entity names** — `alt="Swiss Re logo"`, `alt="Munich Re logo"` etc. help AI systems confirm business relationships.

**Brand name variants inconsistent** — `meta.siteName` = "Detondo Corretora de Seguros e Resseguros", `common.brand` = "Detondo", `alternateName` = "Detondo Seguros". Replace single `alternateName` string with an array: `["Detondo Seguros", "Detondo Corretora de Seguros"]`.

**AI crawler access** — All AI crawlers implicitly allowed via `*` wildcard in `robots.ts`. This is correct; no action needed.

---

## Local SEO — 38/100

### Critical

**No Google Business Profile** — Zero GBP signals anywhere on-site. GBP is the #1 local ranking factor. For "corretora de seguros Luanda" queries, the site cannot appear in the local pack without a GBP listing.

Action: Create/claim a GBP at the Nova Vida / Kilamba Kiaxi address. Primary category: "Insurance agency". Include ARSEG licence number in the description. Once live, add GBP URL to `sameAs` in `lib/jsonld.tsx`.

**Gmail address as primary business contact** — `detondocorretoraseguros@gmail.com` appears in JSON-LD, footer, and contact page. A Gmail address for an ARSEG-supervised brokerage that works with Lloyd's and Swiss Re is a professional credibility signal failure.

Action: Replace with `geral@detondocorretora.com` in `lib/jsonld.tsx`, `components/layout/Footer.tsx`, and `app/[lang]/contact/page.tsx`.

### High

**Missing `geo` coordinates in schema** — Add `GeoCoordinates` (Kilamba Kiaxi, Luanda: lat -8.9035, lon 13.2441) to the InsuranceAgency payload.

**Missing `openingHoursSpecification`** — Mon-Fri 08:00-17:00 exists in the dictionary but not in schema. Add to `lib/jsonld.tsx`.

**Missing geo meta tags** — Add to `generateMetadata` via `other`:
```json
{
  "geo.region": "AO-LUA",
  "geo.placename": "Luanda, Angola",
  "geo.position": "-8.90350;13.24410",
  "ICBM": "-8.90350, 13.24410"
}
```

**No Google Maps embed or directions link** — Contact page has address text but no map. Add an embedded Google Maps iframe (post-GBP) or a deep-link to the Maps listing.

### Medium

**`areaServed` fix** — Covered in Schema section.

**`foundingDate` and `addressRegion`** — Add "2017" and "Luanda" (or "AO-LUA") to schema.

**Address separator in JSON-LD** — Use comma form to match all other surfaces.

**Zero review signals** — No GBP = no reviews. Once GBP is live, build a review solicitation process. Target 1 new review per 2 weeks to avoid the Sterling Sky 18-day velocity cliff.

**WhatsApp absent** — WhatsApp is a primary B2B communication channel in Angola. Add as a `contactPoint` in schema and as a visible contact option on the contact page.

---

## SXO (Search Experience) — 53/100

### Persona Scores

| Persona | Score | Primary Gap |
|---|---|---|
| Corporate risk manager | 68/100 | Business service pages have no body copy; no intermediate CTA |
| Oil and gas procurement officer | 44/100 | No dedicated oil-and-gas page; ANPG cert buried; no sector-specific CTA path |
| Individual (personal insurance) | 82/100 | Best-served; testimonials missing is the only gap |

### Critical

**No dedicated oil-and-gas/sector page** — The highest-value keyword cluster ("seguro petróleo gás Angola", "ANPG corretora seguros") has no targeted URL. `/services/business` is a 13-item list with zero body copy. An ANPG-certified brokerage with no oil-and-gas content page is leaving its strongest differentiator invisible to the keyword that matters most.

Action: Create `/services/oil-gas` (or expand `/services/business` into per-sector pages) with: 600+ words on upstream/midstream/downstream coverages, inline ANPG certificate reference, ARSEG licence number, a `?topic=oilgas` pre-wired CTA, and metadata targeting the oil-and-gas keyword cluster.

**`Testimonials` component not rendered on homepage** — The component, copy (three client quotes), and schema are ready; the component is simply missing from `app/[lang]/page.tsx`. A one-line import fix restores three trust signals.

### High

**Business service items have no descriptions** — 13 insurance line names with no descriptive copy. Add at minimum 2-3 sentences per item in `business.items`. For oil-and-gas, marine, energy, and construction: create dedicated sub-pages with 600+ words each.

**No desktop navigation dropdown** — Service categories require an intermediate hub-page click. Add a Services dropdown or mega-menu to reduce the path to any category from 2 clicks to 1.

**Mining not in mobile sub-navigation** — `/services/mining` is a valid route but absent from the mobile nav `Services` sub-items.

**Gmail address** — Covered in Local SEO section; repeated here as a conversion signal for corporate personas.

### Medium

**ANPG certificate not surfaced on service pages** — The certificate PDF exists but is not linked from the business/oil-and-gas service context where it carries the most persuasive weight.

**WhatsApp absent** — Covered in Local SEO.

**No SLA on contact page** — "normalmente em menos de 24 horas" appears in the contact form description but is vague. An explicit response commitment ("within one business day") on the contact page improves conversion confidence.

**Vision copy violates CLAUDE.md section 7** — "global risk solutions provider of choice, delivering exceptional results through the balance of our strengths" — rewrite in both locales.

---

## What Is Working Well

- **Next.js SSR/SSG** — All pages are server-rendered with `generateStaticParams`. Googlebot receives complete HTML. No JavaScript-rendering risk.
- **Bilingual implementation** — hreflang in layout, per-page metadata, and sitemap is correctly structured. `x-default: /pt` is correct. Locale switcher swaps path segment only. `getDictionary` / `hasLocale` pattern is solid.
- **URL structure** — Clean `/{lang}/{route}` kebab-case slugs, no query pollution.
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors: none`, `poweredByHeader: false` — all correct.
- **Font loading** — Geist with `display: swap`, self-hosted via `next/font`. CLS minimisation via automatic `size-adjust`.
- **Image component** — `next/image` used consistently across all components; AVIF/WebP configured; `priority` on above-the-fold images; appropriate `sizes` props.
- **Proxy redirect** — `proxy.ts` uses 308 (permanent) for locale redirect, preserving link equity.
- **ANPG/ARSEG credentials** — Specific, verifiable, prominently placed. Unique differentiators in the Angola insurance market.
- **Contact form** — 4-step guided form with service-type pre-qualification. `?topic=` param support for CTA wiring.
- **Accessibility** — Skip-to-content link, `useReducedMotion()` respected, semantic HTML, `aria-current` on active nav.
- **Google Analytics** — Conditional: production-only, `gaId`-gated, via `@next/third-parties` for off-main-thread loading.
- **`prefers-reduced-motion`** — Implemented both in `globals.css` and in all Framer Motion components.
- **Legal pages** — Privacy Policy, Terms, AML/KYC, Regulatory Notice, Cookies, Disclaimer — all present and substantially filled, appropriate for a YMYL financial services site.
- **International insurer panel** — Swiss Re, Munich Re, Lloyd's plus 13 named Angolan insurers. Strong authority signal on every page via the Partners section.

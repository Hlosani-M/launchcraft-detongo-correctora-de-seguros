# Full SEO Audit Report — Detondo Corretora de Seguros

**Domain:** https://www.detondocorretora.com
**Audit date:** 2026-05-25 (LIVE site audit)
**Business type:** Insurance and reinsurance brokerage (YMYL) — Luanda, Angola
**Stack:** Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript · Bilingual (pt/en)
**Audited by:** 8 specialist subagents — Technical, Content/E-E-A-T, Schema, Sitemap, Local SEO, Performance, GEO/AI, SXO

---

## SEO Health Score: 55 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 58 | 12.8 |
| Content Quality (E-E-A-T) | 23% | 56 | 12.9 |
| On-Page SEO | 20% | 62 | 12.4 |
| Schema / Structured Data | 10% | 32 | 3.2 |
| Performance (CWV) | 10% | 55 | 5.5 |
| AI Search Readiness (GEO) | 10% | 41 | 4.1 |
| Local SEO | 5% | 38 | 1.9 |
| Images | 5% | 55 | 2.8 |
| **Total** | | | **55.6 → 56** |

Score fell 4 points from the initial codebase audit after live testing revealed zero Vercel edge caching on all pages, schema issues confirmed in live HTML, email NAP fragmentation (3 different addresses), and the GEO/Local audits surfacing the empty `sameAs` and no Google Business Profile.

**Strengths:** SSR with full HTML rendered to crawlers, bilingual hreflang correctly wired, ARSEG licence 112/ASEG/MF/23 visible in HTML, ANPG certification section, Swiss Re/Munich Re/Lloyd's panel, 25 routes all returning HTTP 200.

**Root problems:** No entity disambiguation (empty `sameAs`), no edge caching (every request is a fresh server render), testimonials component built but never mounted, and the oil & gas persona — the site's highest commercial value segment — has no dedicated landing page.

---

## Business Type Detected

**Brick-and-mortar Local Service + B2B Specialist**

Primary market: Corporate clients, oil & gas operators (ANPG-regulated), energy sector, individual. HQ: Kilamba Kiaxi, Luanda, Angola. Regulated by ARSEG (licence 112/ASEG/MF/23), ANPG-certified.

---

## Live Site Snapshot

| Signal | Status |
|---|---|
| Root `/` redirect | 308 → `/pt` (correct) |
| HSTS | Present on Vercel edge (max-age=63072000) |
| All 30 sitemap routes | HTTP 200 |
| `x-vercel-cache` across all pages | **MISS** (critical — no edge caching) |
| `cache-control` | `private, no-cache` |
| hreflang (HTML) | `pt`, `en`, `x-default` all present |
| Canonical | Absolute URL, correct |
| llms.txt | 404 — file does not exist |
| GA4 | G-W62W0GTQ4R, preloaded unconditionally |
| Live JSON-LD `name` | "Detondo Seguros" |
| Live JSON-LD `alternateName` | "Detondo Seguros" (identical — entity bug) |
| Live JSON-LD `sameAs` | `[]` — empty |
| Footer regulatory column | Present and working (recently added) |

---

## Technical SEO

### Critical

**T-1 — Zero Vercel edge caching: every page serves `x-vercel-cache: MISS`**

Confirmed on live site across `/pt`, `/pt/about`, `/pt/services`, `/pt/services/personal/motor`, `/pt/contact` and every other route. Cache-Control is `private, no-cache`. This means every visitor request triggers a fresh server render in the Vercel lambda, multiplying TTFB and increasing costs.

Root cause candidates from codebase audit:
- `CookieBanner` component (used in `app/[lang]/layout.tsx`) reads cookie state — if it calls `cookies()` from `next/headers`, it opts the entire layout into dynamic rendering
- `GoogleAnalytics` component from `@next/third-parties/google` may trigger dynamic headers
- Any call to `headers()` or `cookies()` in a Server Component in the layout tree poisons the entire page's static generation

Fix: Audit all imports in `app/[lang]/layout.tsx` for `cookies()` or `headers()` calls. If `CookieBanner` reads cookies server-side, move that check to client-side localStorage or a `useEffect`. The goal is a clean `export const dynamic = 'force-static'` on the layout, or at least `x-vercel-cache: HIT` on second request.

**T-2 — 5 empty YMYL pages not noindexed, included in sitemap**

`/[lang]/faqs`, `/[lang]/claims`, `/[lang]/client-support`, `/[lang]/compliance`, `/[lang]/partners` all render the `ComingSoon` component. These are 10 URLs (2 locales × 5 routes) in the sitemap with no `robots: { index: false }`. Google will crawl and attempt to index thin placeholder pages in the YMYL (insurance) category, which is a soft quality signal penalty.

Fix: Add `robots: { index: false, follow: true }` to `generateMetadata` in each of the five page files, OR remove the 5 routes from `app/sitemap.ts` ROUTES array.

### High

**T-3 — `siteUrl` fallback in `app/sitemap.ts` omits `www`**

Line 5: `const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://detondocorretora.com"`. The fallback omits `www`. Every preview deployment or local build without the env var will produce 50 sitemap URLs pointing to the non-canonical bare domain. The canonical is `https://www.detondocorretora.com`.

Fix: Change the fallback string to `"https://www.detondocorretora.com"`.

**T-4 — All 50 sitemap `lastmod` values are identical build timestamps**

`app/sitemap.ts` sets `lastModified: new Date()` which produces the same timestamp for all 50 URLs. Google treats uniform lastmod as unreliable and ignores it. Every deploy bumps all 50 lastmod values simultaneously, further degrading the signal.

Fix: Use static per-route dates in the ROUTES structure and update only when content genuinely changes.

**T-5 — Missing security headers: COOP, CORP, X-DNS-Prefetch-Control**

Live response headers confirm HSTS (Vercel-managed), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and CSP are present. Missing: `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-DNS-Prefetch-Control`. These are medium-priority browser security signals.

Fix: Add to `next.config.ts` headers array.

**T-6 — GA4 loads unconditionally before cookie consent**

`GoogleAnalytics` renders in the layout without checking the `cookieBanner.accepted` cookie state. GA4 is a tracking script — loading before consent may violate GDPR/LGPD principles. The `CookieBanner` component records consent but the analytics script does not gate on it.

Fix: Move `GoogleAnalytics` rendering to a client component that reads the consent cookie before mounting.

### Medium

**T-7 — `changeFrequency` and `priority` fields in sitemap**

Google confirmed it ignores both fields. 50 URLs × ~60 bytes = 3 KB of noise. Remove from `app/sitemap.ts` for cleanliness.

---

## Content Quality / E-E-A-T

### Critical

**E-1 — Testimonials component built but never rendered on homepage**

`components/sections/Testimonials.tsx` is complete, fully translated in both dictionaries (3 testimonials with job titles and companies), and has correct `a11y` keys. `app/[lang]/page.tsx` never imports or renders it. The homepage has zero social proof. For YMYL insurance content, testimonials are an E-E-A-T requirement.

Fix: Import and add `<Testimonials dict={dict.testimonials} />` to `app/[lang]/page.tsx`. Recommended position: after `<Commitment>` and before `<Partners>`.

### High

**E-2 — No dedicated oil & gas landing page**

The oil & gas / energy persona (highest commercial value: ANPG-regulated operators) has no dedicated URL. `/services/business` shows "Seguro de petróleo & gás" as one plain text line among 13. The contact form captures upstream/midstream/downstream/marine as sub-options (proving internal taxonomy exists), but none of that appears as indexable content. ANPG certification is prominently featured on the homepage but leads nowhere deeper.

Fix: Create `/[lang]/services/business/oil-gas` as a dedicated product page mirroring `/services/personal/motor`. Content scaffold is already in the contact form's oil & gas step options.

**E-3 — Business insurance page shows names only, no descriptions**

`dict.business.items` contains only `id` and `name` per line. Contrast with `dict.personal.items` where every product has a `description`. The `BusinessInsurance` component renders a flat name list. Zero body copy per insurance line.

Fix: Add `description` strings to all 13 business items in both locale dictionaries. Update `BusinessInsurance.tsx` to render them.

**E-4 — No named authors, no staff credentials on any page**

Zero named individuals appear on the site. No founder, no director, no account manager. For YMYL insurance content, E-E-A-T requires demonstrable expertise from named humans with verifiable credentials. The About page presents the company narrative but no people.

Fix: Add at minimum a founding director's name, photo, and professional designation to the About page. This is also the strongest AI citability improvement available.

**E-5 — Vision description contains AI filler language**

`dict.vision.description` (PT): "Ser um fornecedor global de escolha em soluções de risco, entregando resultados excepcionais através do equilíbrio entre os nossos pontos fortes: inovação, precisão e serviço." Matches the CLAUDE.md AI filler profile: "global provider of choice", "exceptional results".

Fix: Rewrite as direct positioning. Example: "Ser a corretora de referência em Angola para empresas com exposição a risco nos sectores de energia, petróleo & gás e grandes corporativos." Apply in both locales.

**E-6 — PT diacritics stripped in `legalPages` dictionary content**

`pt.json` `legalPages.aml.*` and surrounding entries contain "decisao estrategica", "subscricao", "aprecados", "publicacao" — missing accents throughout. This is visible on the live AML/KYC page and reads as draft-quality content on a YMYL legal page.

Fix: Restore proper Portuguese diacritics in both the AML/KYC and regulatory content dictionary entries.

**E-7 — Treaty reinsurance description has stripped diacritics**

`pt.json` line ~660: `treaty.description` shows "decisao estrategica", "subscricao" — same class of error as E-6.

Fix: Restore diacritics.

### Medium

**E-8 — No question-form headings on any page**

All H1/H2/H3 headings are declarative statements. Zero headings across all pages use question form. Question-form headings are the primary trigger for Google AI Overview matching and improve citability on Perplexity, Bing Copilot, and ChatGPT Browse.

Fix: Reframe at least one H2 per major page as a question matching user search intent. Examples: "O que é a ARSEG e qual o seu papel?" instead of "Registada e supervisionada pela ARSEG". Apply in both locales.

**E-9 — No blog or insights section**

No dated, authoritative content exists on the site. Legal pages state "Ultima atualização: Maio 2026" which provides some freshness signal, but service and company pages have no timestamps. AI citation platforms heavily favour dated, topic-specific content.

Fix: Create a minimal `/[lang]/insights` or `/[lang]/news` route with 2-3 short articles: Angola regulatory updates, ANPG certification explainer, insurance market overview. Establishes freshness signals and AI-citable surfaces.

**E-10 — Prose passages too short for optimal AI citation (45-60 words vs. 134-167 word ideal)**

All key body paragraphs across homepage and service pages run 45-60 words per element. The optimal AI citation passage window is 134-167 words in a single `<p>` or `<section>`. Multiple short paragraphs are not treated as a single citable unit.

Fix: Merge or extend `whoWeAre.paragraphs` into one block of 134+ words. Extend service product `details` fields.

---

## On-Page SEO

### Medium

**O-1 — `<title>` template separator mismatch**

`layout.tsx` uses `template: '%s · ${dict.common.brand}'` with a middle-dot separator. CLAUDE.md section 7 requires `|` as the separator. Some product pages also embed the brand suffix in their `meta.title` dictionary entry, causing "Seguro Automóvel | Detondo Seguros · Detondo Seguros" in rendered tab titles.

Fix: Change template to `'%s | ${dict.common.brand}'`. Remove brand suffixes from per-page `meta.title` values in both dictionaries.

**O-2 — Mining service has no header nav entry point**

`/services/mining` is linked only from the footer Corporate column. The header nav and the `/services` hub page (3 cards: Personal, Business, Reinsurance) omit Mining entirely. A prospect searching for mining insurance cannot reach this page through primary navigation.

Fix: Add a fourth card to the services hub, or add Mining to header mobile nav sub-items.

**O-3 — ANPG certification link goes to agency homepage, not certificate**

The `AnpgCertification` component links to `https://anpg.co.ao/` rather than the supplier registry entry or certificate document. A procurement officer verifying supplier credentials gets no direct evidence.

Fix: Link to the ANPG supplier registry URL for Detondo's entry, or add `/public/anpg-certificate.pdf` as a downloadable link with "Descarregar certificado" label.

---

## Schema / Structured Data

**Score: 32/100** — The `InsuranceAgency` type is correct, but 9 of 14 recommended properties fail validation.

### Critical

**S-1 — `name` and `alternateName` are identical**

Both resolve to `"Detondo Seguros"`. `name` should be the full trading name ("Detondo Corretora de Seguros e Resseguros") and `alternateName` should be the common short form ("Detondo" or "Detondo Seguros"). Having them identical wastes the disambiguation signal Google uses for Knowledge Panel entity matching.

File: `lib/jsonld.tsx` line 16-17. Also requires `dict.meta.siteName` to be kept at "Detondo Seguros" (for `<title>` / OG) while adding a new `dict.meta.organizationName` key for the structured data name field.

**S-2 — `url` includes locale path**

`` url: `${siteUrl}/${lang}` `` produces `https://www.detondocorretora.com/pt` on PT and `/en` on EN. `Organization.url` should always be the root domain. Two locale-specific URLs on the same organization creates an entity conflict — Google may resolve `/pt` and `/en` as two separate businesses.

File: `lib/jsonld.tsx` line 19. Fix: `url: siteUrl`.

### High

**S-3 — `areaServed` contains invalid value "Africa"**

`areaServed: ["AO", "Africa"]` — "Africa" is a continent with no ISO 3166-1 code. Schema.org `areaServed` accepts `Country`, `State`, `City`, or an `AdministrativeArea`. Google will either ignore "Africa" or penalise the block.

File: `lib/jsonld.tsx` line 23. Fix: `areaServed: { "@type": "Country", "name": "Angola", "sameAs": "https://www.wikidata.org/wiki/Q916" }`.

**S-4 — No per-page schema**

Zero JSON-LD on any non-homepage route. Missing:
- `BreadcrumbList` on all service, about, contact, and legal pages
- `Service` schema on all service category and product pages
- `AboutPage` on `/about`
- `WebPage` with `inLanguage` on all pages

`BreadcrumbList` is a supported Google rich result. Service pages with `Service` schema get better entity matching in AI knowledge graphs.

**S-5 — No `WebSite` schema**

No `WebSite` block anywhere. This is the correct home for `inLanguage` (currently wrongly attached to `InsuranceAgency`), `SearchAction` for Sitelinks Searchbox, and `potentialAction`.

### Medium

**S-6 — `sameAs: []` is empty**

Empty array is technically valid JSON-LD but signals no external entity links. Google, ChatGPT, Perplexity, and Bing Copilot all weight `sameAs` for entity disambiguation. No `sameAs` = no Knowledge Panel candidate, no cross-platform entity matching.

Fix: Populate with: Google Business Profile URL (once claimed), LinkedIn company page, ARSEG directory listing URL, ANPG certification registry URL.

**S-7 — `inLanguage` on `InsuranceAgency`**

`inLanguage` is a `CreativeWork` property. Placing it on an `Organization` subtype is semantically invalid. Parsers silently ignore it. Move to a `WebSite` or `WebPage` schema block.

**S-8 — Missing `foundingDate`, `openingHoursSpecification`, `identifier`**

- `foundingDate: "2017"` — stated in prose but not in structured data. AI models use this for entity verification.
- `openingHoursSpecification` — Monday-Friday 08:00-17:00 is in the dictionaries as visible text but not machine-readable. Required for rich results.
- `identifier` — ARSEG licence 112/ASEG/MF/23 and ANPG certification are high-trust identifiers for a regulated financial entity.

**S-9 — Email in schema is a Gmail address**

`email: "detondocorretoraseguros@gmail.com"` in `lib/jsonld.tsx`. This is a pre-rebrand Gmail address. Contact page and footer use `geral@detondocorretora.com` (PT) and `info@detondocorretora.com` (EN). Three different email addresses across three surfaces is a NAP fragmentation issue beyond just schema.

Fix: Standardise to `geral@detondocorretora.com` across schema, PT, and EN. Remove `info@` alias or redirect it.

---

## Performance

### Critical

**P-1 — No edge caching (repeat of T-1 from performance perspective)**

With every request as a fresh server render, TTFB is elevated for all users. Vercel's edge network cannot serve cached HTML. This directly impacts LCP scores.

### High

**P-2 — Oversized images (3.5 MB files)**

Prior codebase audit identified `public/` images reaching 3.5 MB. Next.js `<Image>` handles AVIF/WebP conversion and lazy loading for components that use it, but any `<img>` tags or CSS background images bypass this. Static `opengraph-image.png`, `logo-dark.jpg`, `apple-icon.png` should be compressed.

Fix: Run all `public/` images through Squoosh or similar. Target <200 KB for hero/OG images, <50 KB for logos.

**P-3 — GA4 preloads unconditionally (cookie consent gap + performance)**

`GoogleAnalytics` renders on every page regardless of consent state. This adds a third-party script request to every page load before the user accepts cookies, impacting INP and potentially violating consent requirements.

---

## GEO / AI Search Readiness

**Score: 41/100**

| Platform | Score | Key Blockers |
|---|---|---|
| Google AI Overviews | 28/100 | No FAQPage schema, no question headings, no named authors, `sameAs` empty |
| ChatGPT (Browse) | 35/100 | No YouTube, no Wikipedia, no Reddit, `sameAs` empty |
| Perplexity | 45/100 | SSR is a strength; ARSEG licence visible; but no Q&A, passages too short |
| Bing Copilot | 38/100 | Schema present but incomplete; no FAQPage; good English parity |

### Critical

**G-1 — `sameAs: []` empty — entity cannot be cross-referenced**

This is the single highest-impact GEO gap. Without external entity links (LinkedIn, GBP, ARSEG directory), AI models cannot verify or disambiguate this entity. ChatGPT, Perplexity, and Bing Copilot all weight `sameAs` for citation decisions.

**G-2 — No FAQPage content or schema**

`/[lang]/faqs` renders `ComingSoon`. No Q&A content anywhere on the site. FAQPage schema is one of the strongest Google AI Overview triggers. Insurance FAQs are high-volume informational queries.

**G-3 — llms.txt returns 404**

`public/llms.txt` does not exist. All AI crawlers are implicitly allowed (correct via robots.txt), but there is no structured guide telling AI indexers what to cite, how to interpret the entity, or what the canonical contact/regulatory information is.

A ready-to-deploy `llms.txt` is provided in the Action Plan.

### High

**G-4 — Zero question-form headings (repeat of E-8)**

None of the H1/H2/H3 headings across any page are phrased as questions. Question headings are the primary trigger for AI Overview answer box selection.

**G-5 — `name` equals `alternateName` (repeat of S-1 from GEO perspective)**

Identical name and alternateName prevent AI knowledge graphs from matching both "Detondo" (short brand) and "Detondo Corretora de Seguros" (formal name) to the same entity.

**G-6 — JSON-LD email is a Gmail address (repeat of S-9)**

AI citation platforms down-weight financial services entities with free email addresses in their structured data.

**G-7 — No named authors or expert attribution**

No person's name, credential, or photo appears on any page. All major AI search platforms use E-E-A-T signals — named, credentialled experts — for deciding whether to cite YMYL content.

---

## Local SEO

**Score: 38/100** — Angola market specifics heavily penalise absence of GBP and WhatsApp.

### Critical

**L-1 — No Google Business Profile claimed**

No GBP URL anywhere on the site. `sameAs: []` confirms no GBP link in schema. Without a verified GBP, Detondo cannot appear in Google Maps or the local 3-pack for any Luanda insurance query. Proximity weighting (55% of local ranking variance per Search Atlas) cannot be applied to an unverified location.

Fix: Claim and verify at `business.google.com` under `InsuranceAgency` category. Once verified, add the GBP URL to `sameAs` in `lib/jsonld.tsx`.

**L-2 — Email NAP fragmentation across 3 addresses**

| Surface | Email |
|---|---|
| JSON-LD (`lib/jsonld.tsx`) | `detondocorretoraseguros@gmail.com` |
| PT contact page + PT footer | `geral@detondocorretora.com` |
| EN contact page + EN footer | `info@detondocorretora.com` |

Citation algorithms treat different emails on the same entity as mismatches. Fix: Standardise all surfaces to `geral@detondocorretora.com`. Redirect or alias `info@` to it.

**L-3 — No Google Maps embed or directions link on contact page**

The contact page has a MapPin icon and address text but no iframe, no maps link, no static map image. For Angolan users, Google Maps is the primary navigation tool.

Fix: Add `<iframe src="https://maps.google.com/maps?q=...&output=embed">` or a click-through link adjacent to the address block.

### High

**L-4 — No WhatsApp contact option**

WhatsApp is the dominant professional communication channel in Angola. No `wa.me` link, no WhatsApp floating button, no WhatsApp number appears anywhere on the site. This is both a conversion gap and a local engagement signal gap.

Fix: Add WhatsApp link (`https://wa.me/244XXXXXXXXX`) to: floating mobile CTA layer, contact page info block, and footer. Requires a business WhatsApp number.

**L-5 — No `openingHoursSpecification` in schema**

Hours "Segunda a sexta, 08h00 às 17h00" are in the dictionaries and visible on the contact page but not in machine-readable schema. Required for rich result eligibility.

Fix: Add `openingHoursSpecification` to `lib/jsonld.tsx` with Monday-Friday 08:00-17:00.

**L-6 — No `geo` coordinates in schema**

No `GeoCoordinates` with `latitude`/`longitude` in `lib/jsonld.tsx`. For Kilamba Kiaxi, Luanda, verify exact coordinates from Google Maps (approximately -8.91667, 13.26667) and add `geo: { "@type": "GeoCoordinates", latitude: -8.XXXXX, longitude: 13.XXXXX }`.

**L-7 — Address separator inconsistency between schema and HTML**

JSON-LD `streetAddress`: "Nova Vida - Kilamba Kiaxi" (hyphen)
Visible HTML (contact page + footer): "Nova Vida, Kilamba Kiaxi" (comma)

Fix: Change `streetAddress` in `lib/jsonld.tsx` to use comma to match the visible HTML.

---

## SXO / Search Experience

**Overall SXO Score: 53/100**

| Dimension | Max | Score |
|---|---|---|
| Page Type Match | 15 | 9 |
| Content Depth | 15 | 6 |
| UX Signals | 15 | 8 |
| Schema | 15 | 7 |
| Media | 15 | 9 |
| Authority | 15 | 10 |
| Freshness | 10 | 4 |

### Persona Journey Scores

| Persona | Score | Bottleneck |
|---|---|---|
| Corporate risk manager | 60/100 | Business page has no descriptions per line |
| Oil & gas procurement officer (ANPG) | 53/100 | No dedicated oil & gas page |
| Individual / personal insurance | 81/100 | Best-served journey; motor page is strong |

---

## Hreflang Implementation

**PASS.** Hreflang is correctly implemented in both HTML `<link>` tags (via `generateMetadata.alternates.languages`) and in the XML sitemap (`xhtml:link` within each `<url>` block). `x-default` correctly points to `/pt`. Reciprocal references are symmetric across locales.

---

## robots.txt

**PASS.** `User-agent: * / Allow: / / Disallow: /api/`. All AI crawlers implicitly allowed. Sitemap directive points to canonical `www` domain. `Host` directive (Yandex hint) is harmless.

---

## Appendix: Ready-to-Deploy llms.txt

Save as `public/llms.txt`:

```
# Detondo Corretora de Seguros - AI Content Guide
# https://www.detondocorretora.com
# Last updated: 2026-05-25

> Detondo is an Angolan insurance and reinsurance brokerage, established in 2017 and headquartered in Luanda, Angola. The company holds ARSEG licence 112/ASEG/MF/23 as a registered insurance broker and is certified by ANPG (Agencia Nacional de Petroleo, Gas e Biocombustiveis) to provide goods and services to Angola's Oil & Gas sector. Detondo works with more than 10 insurers in the Angolan market and with international reinsurers including Swiss Re, Munich Re, and Lloyd's of London.

## About

Detondo is a licensed insurance and reinsurance brokerage based in Luanda, Angola. The company has operated since 2017 and serves corporate clients, energy companies, oil and gas operators, mining firms, and individual clients across Angola. Detondo holds ARSEG licence 112/ASEG/MF/23 and ANPG certification for the Petroleum and Gas sector. The legal entity name is Detondo Corretora de Seguros, Lda.

Contact: geral@detondocorretora.com
Address: Rua no 121, casa no 1262 D, Nova Vida, Kilamba Kiaxi, Luanda, Angola
Phone: +244 921 545 832
Language support: Portuguese, English

## Services

Detondo provides three main service lines:

1. Personal insurance - motor, building, home contents, all-risks, personal liability, travel
2. Business insurance - corporate, oil and gas, energy, marine, construction all risks, liability, professional indemnity, goods in transit, fleet, aviation, agricultural, mining
3. Reinsurance - treaty, facultative, and alternative risk transfer

The company also offers group schemes including group personal accident and health insurance.

## Regulatory Information

- Regulator: ARSEG (Agencia Angolana de Regulacao e Supervisao de Seguros)
- Licence reference: 112/ASEG/MF/23
- Entity type: Registered insurance broker
- ANPG certification: Authorised to provide goods and services to Angola's Oil and Gas sector
- Operating jurisdiction: Republic of Angola

## Key Pages

- Homepage (PT): https://www.detondocorretora.com/pt
- Homepage (EN): https://www.detondocorretora.com/en
- About (PT): https://www.detondocorretora.com/pt/about
- Services (PT): https://www.detondocorretora.com/pt/services
- Personal Insurance (PT): https://www.detondocorretora.com/pt/services/personal
- Business Insurance (PT): https://www.detondocorretora.com/pt/services/business
- Reinsurance (PT): https://www.detondocorretora.com/pt/services/reinsurance
- Mining Insurance (PT): https://www.detondocorretora.com/pt/services/mining
- Contact (PT): https://www.detondocorretora.com/pt/contact
- Contact (EN): https://www.detondocorretora.com/en/contact
- Regulatory Notice (PT): https://www.detondocorretora.com/pt/regulatory-notice
- AML & KYC Policy (PT): https://www.detondocorretora.com/pt/aml-kyc
- Privacy Policy: https://www.detondocorretora.com/pt/privacy-policy
- Sitemap: https://www.detondocorretora.com/sitemap.xml

## Partner Insurers in Angola

ENSA Seguros, Nossa Seguros, BIC Seguros, Sanlam Seguros, Fidelidade Seguros, STAS Seguros, Proteja Seguros, Viva Seguros, Unisaude Seguros, Fortaleza Seguros, Harmonia Seguros, Alianca Seguros, Mundial Seguros

## International Reinsurers

Swiss Re, Munich Re, Lloyd's of London

## Content Licensing

Content on this site may be cited for informational purposes. Insurance coverage, policy terms, and pricing are subject to underwriting acceptance and applicable regulatory requirements. All information is provided for general purposes and does not constitute professional insurance advice.
```

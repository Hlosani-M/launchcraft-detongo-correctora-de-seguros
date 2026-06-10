# SEO Action Plan — Detondo Corretora de Seguros

**Updated:** 2026-05-25 (Live site audit)
**Overall score:** 56/100
**Target:** 75/100 in 90 days

Items are organised by priority tier. Within each tier, items are ordered by impact/effort ratio. File paths are relative to the repo root.

---

## CRITICAL — Fix within 1 week

### C-1 — Mount Testimonials on homepage
**Impact: High | Effort: 5 min | Category: Content/SXO**

`app/[lang]/page.tsx` — Import `Testimonials` and add `<Testimonials dict={dict.testimonials} />` after `<Commitment>` and before `<Partners>`. The component is fully built and translated in both locales. The homepage has zero social proof — this is a one-line fix.

### C-2 — Create public/llms.txt
**Impact: High | Effort: 10 min | Category: GEO**

Create `public/llms.txt` with the ready-to-deploy content from the FULL-AUDIT-REPORT.md Appendix. Deploys to `https://www.detondocorretora.com/llms.txt`. No code changes needed — static file in `public/`.

### C-3 — Noindex 5 placeholder pages OR remove them from sitemap
**Impact: High | Effort: 15 min | Category: Technical**

Option A (recommended): In `app/sitemap.ts`, remove these 5 entries from the ROUTES array:
- `"/faqs"`, `"/claims"`, `"/client-support"`, `"/compliance"`, `"/partners"`

Option B: Add `robots: { index: false, follow: true }` to `generateMetadata` in each of the 5 page files:
- `app/[lang]/faqs/page.tsx`
- `app/[lang]/claims/page.tsx`
- `app/[lang]/client-support/page.tsx`
- `app/[lang]/compliance/page.tsx`
- `app/[lang]/partners/page.tsx`

### C-4 — Fix email NAP fragmentation (standardise to geral@)
**Impact: High | Effort: 20 min | Category: Local SEO**

Three different email addresses across three surfaces:
- `lib/jsonld.tsx` line 32: change `"detondocorretoraseguros@gmail.com"` to `"geral@detondocorretora.com"`
- `app/[lang]/dictionaries/en.json`: change `footer.email` and `contact.emailAddress` from `"info@detondocorretora.com"` to `"geral@detondocorretora.com"`

Bilingual contract: update `en.json` AND `pt.json` in the same commit.

### C-5 — Fix schema entity disambiguation: name vs alternateName
**Impact: High | Effort: 25 min | Category: Schema/GEO**

`lib/jsonld.tsx`:
- Change `name` from `dict.meta.siteName` ("Detondo Seguros") to a new key `dict.meta.organizationName` ("Detondo Corretora de Seguros e Resseguros")
- Change `alternateName` from hardcoded `"Detondo Seguros"` to `dict.meta.alternateName` ("Detondo")
- Change `url` from `` `${siteUrl}/${lang}` `` to `siteUrl`

Add to both dictionaries under `meta`:
```json
"organizationName": "Detondo Corretora de Seguros e Resseguros",
"alternateName": "Detondo"
```

### C-6 — Fix siteUrl www fallback in sitemap
**Impact: Medium | Effort: 2 min | Category: Technical**

`app/sitemap.ts` line 5: change fallback from `"https://detondocorretora.com"` to `"https://www.detondocorretora.com"`.

### C-7 — Fix areaServed invalid value in schema
**Impact: Medium | Effort: 5 min | Category: Schema**

`lib/jsonld.tsx` line 23: change `areaServed: ["AO", "Africa"]` to `areaServed: { "@type": "Country", name: "Angola", sameAs: "https://www.wikidata.org/wiki/Q916" }`.

### C-8 — Fix diacritics in PT dictionary legalPages content
**Impact: Medium | Effort: 20 min | Category: Content**

`app/[lang]/dictionaries/pt.json` — Restore proper accents throughout:
- `legalPages.aml.*` (entire section: "decisao", "subscricao", "aprecados", "publicacao", "estrategica")
- `treaty.description` (~line 660)

Run `grep -n "decisao\|subscricao\|aprecados\|publicacao\|estrategica" app/\[lang\]/dictionaries/pt.json` to locate all instances.

---

## HIGH — Fix within 2 weeks

### H-1 — Claim Google Business Profile (external action)
**Impact: Very High | Effort: External | Category: Local SEO**

Go to `business.google.com`. Claim and verify under category `InsuranceAgency`. Once verified, add the GBP URL (format: `https://maps.google.com/?cid=XXXXXXX`) to `sameAs` in `lib/jsonld.tsx`. Unlocks Google Maps and local 3-pack eligibility.

### H-2 — Add openingHoursSpecification and geo to JSON-LD
**Impact: High | Effort: 15 min | Category: Schema/Local**

`lib/jsonld.tsx` — Add:
```ts
openingHoursSpecification: [{
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
  opens: "08:00",
  closes: "17:00"
}],
geo: {
  "@type": "GeoCoordinates",
  latitude: -8.91667,  // verify exact coords from Google Maps
  longitude: 13.26667
},
```

Also change `streetAddress` from "Nova Vida - Kilamba Kiaxi" (hyphen) to "Nova Vida, Kilamba Kiaxi" (comma) to match visible HTML.

### H-3 — Add WebSite JSON-LD block
**Impact: High | Effort: 15 min | Category: Schema**

`lib/jsonld.tsx` — Export a new `WebSiteJsonLd` component and render it in `app/[lang]/layout.tsx` alongside `OrganizationJsonLd`. Moves `inLanguage` from `InsuranceAgency` (wrong) to `WebSite` (correct):
```ts
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Detondo Seguros",
  url: "https://www.detondocorretora.com",
  inLanguage: ["pt-AO", "en"],
}
```

### H-4 — Add foundingDate and identifier to schema
**Impact: Medium | Effort: 10 min | Category: Schema/GEO**

`lib/jsonld.tsx`:
```ts
foundingDate: "2017",
identifier: {
  "@type": "PropertyValue",
  propertyID: "ARSEG",
  value: "112/ASEG/MF/23"
},
```

### H-5 — Populate sameAs with external URLs
**Impact: Very High | Effort: 30 min | Category: Schema/GEO/Local**

`lib/jsonld.tsx` line 42 — Replace `sameAs: []` with verifiable external entity URLs:
- GBP URL (after H-1 is done)
- LinkedIn company page URL
- ARSEG directory listing URL (check arseg.ao)
- ANPG supplier registry URL (if publicly accessible)

Even 2 URLs unlock entity disambiguation across all AI search platforms.

### H-6 — Fix title template separator
**Impact: Medium | Effort: 10 min | Category: On-Page**

`app/[lang]/layout.tsx`: change `template: '%s · ${dict.common.brand}'` to `template: '%s | ${dict.common.brand}'`. Also strip " | Detondo Seguros" suffix from any `meta.title` dictionary entries that already include it.

### H-7 — Add BreadcrumbList schema to key pages
**Impact: High | Effort: 1-2 hours | Category: Schema**

Add page-level `BreadcrumbList` JSON-LD to all service category, service product, about, and contact pages. Use dictionary values for breadcrumb labels.

### H-8 — Fix vision description AI filler copy
**Impact: Medium | Effort: 15 min | Category: Content**

Both dictionaries, `vision.description` — rewrite from "Ser um fornecedor global de escolha em soluções de risco, entregando resultados excepcionais..." to direct positioning language.

### H-9 — Add question-form headings to key pages
**Impact: High | Effort: 30 min | Category: Content/GEO**

Both dictionaries — reframe at least one H2 per major page as a question matching user search intent:
- Homepage: "O que é a ARSEG e como protege os seus seguros?" / "What is ARSEG and why does it matter?"
- Services/Business: "Que coberturas existem para empresas em Angola?"
- About: "Porque escolher uma corretora certificada pela ANPG?"

Bilingual contract: both locales in same commit.

### H-10 — Fix logo alt text
**Impact: Low | Effort: 5 min | Category: Accessibility**

`components/layout/Logo.tsx` — Ensure the SVG has a `title` element or the wrapping `<Link>` has a descriptive `aria-label`.

### H-11 — Investigate and fix Vercel edge caching
**Impact: Very High | Effort: 1-2 hours | Category: Technical/Performance**

Every page returns `x-vercel-cache: MISS`. Root cause is likely a `cookies()` or `headers()` call in `app/[lang]/layout.tsx` dependency tree (likely `CookieBanner`). 

Steps:
1. `grep -rn "from 'next/headers'" app/ components/ lib/`
2. For each match, determine if it's in the layout's render path
3. Move any server-side cookie reads to a client component using `useEffect`

Target: `x-vercel-cache: HIT` on second request.

### H-12 — Add WhatsApp contact
**Impact: High | Effort: 30 min | Category: Local SEO/SXO**

Add WhatsApp link to contact page, floating mobile CTA layer in `Header.tsx`, and optionally the footer. Template: `https://wa.me/244921545832?text=Olá, gostaria de saber mais sobre os serviços Detondo.`

Bilingual contract: add `dict.contact.whatsapp` label key in both locales.

---

## MEDIUM — Fix within 1 month

### M-1 — Create oil & gas dedicated landing page
**Impact: Very High | Effort: 3-4 hours | Category: Content/SXO**

Create `app/[lang]/services/business/oil-gas/page.tsx`. Mirror structure of `/services/personal/motor`. Content scaffold: the contact form's oil & gas segment options (upstream, midstream, downstream, marine). Add ANPG certification reference, coverage types, sector-specific CTA, and `Service` JSON-LD. Full bilingual.

### M-2 — Add descriptions to business insurance items
**Impact: High | Effort: 1-2 hours | Category: Content/SXO**

Both dictionaries — add `description` string to all 13 `business.items` entries. Update `components/sections/BusinessInsurance.tsx` `Item` type and render. Pattern from `personal.items` which already has descriptions.

### M-3 — Add Google Maps embed to contact page
**Impact: High | Effort: 30 min | Category: Local SEO**

`app/[lang]/contact/page.tsx` — Add iframe embed or maps link adjacent to the address block.

### M-4 — Add Service schema to service pages
**Impact: Medium | Effort: 1-2 hours | Category: Schema**

Page-level `Service` JSON-LD on all service category and product pages, with values from the respective dictionary entries.

### M-5 — Add Mining to services hub and/or nav
**Impact: Medium | Effort: 30 min | Category: On-Page/SXO**

Add a 4th card to the `/services` hub for Mining, or add it to mobile nav sub-items.

### M-6 — Populate FAQs page with real content
**Impact: High | Effort: 2-3 hours | Category: Content/GEO**

Replace `ComingSoon` with actual Q&A content in both locales. Add `FAQPage` JSON-LD. Re-add route to sitemap. Questions to start with: what is a broker, what is ARSEG, is Detondo ANPG-certified, how to file a claim.

### M-7 — Fix sitemap lastModified strategy
**Impact: Medium | Effort: 30 min | Category: Technical**

`app/sitemap.ts` — Replace `const now = new Date()` with static per-route dates. Update only when content genuinely changes.

### M-8 — Link ANPG section to certificate
**Impact: Medium | Effort: 15 min | Category: On-Page/SXO**

`components/sections/AnpgCertification.tsx` — Change link from `https://anpg.co.ao/` to the supplier registry entry, or add a "Descarregar certificado" link pointing to `/anpg-certificate.pdf`.

### M-9 — Fix GA4 cookie consent gating
**Impact: Medium | Effort: 30 min | Category: Technical/Legal**

Move `GoogleAnalytics` to a client component that checks consent state before rendering.

### M-10 — Add COOP, CORP, X-DNS-Prefetch-Control headers
**Impact: Low | Effort: 10 min | Category: Technical**

`next.config.ts` — Add `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, `X-DNS-Prefetch-Control: on`.

### M-11 — Compress public/ images
**Impact: Medium | Effort: 1 hour | Category: Performance**

Target: `opengraph-image.png` <200 KB, all logos <50 KB, hero images <300 KB.

### M-12 — Remove changeFrequency and priority from sitemap
**Impact: Low | Effort: 5 min | Category: Technical**

Google ignores both fields. Remove from `app/sitemap.ts` ROUTES array.

---

## LOW — Backlog

- **L-1** — Add named founder/director to About page (E-E-A-T for YMYL)
- **L-2** — Create /insights with 2-3 articles on Angola insurance regulation (freshness + AI citation)
- **L-3** — Add aggregateRating to schema (only after 5+ genuine GBP reviews)
- **L-4** — Add LinkedIn company page; add URL to sameAs
- **L-5** — Extend prose passages to 134-167 word optimal AI citation length
- **L-6** — Update CLAUDE.md section 10 — Testimonials aria-label drift is now resolved
- **L-7** — Explicit per-crawler rules in `app/robots.ts` (allow search AI, optionally block training scrapers)

---

## Implementation Roadmap

| Week | Actions |
|---|---|
| Week 1 | C-1 through C-8 |
| Week 2 | H-1 (GBP claim), H-2 through H-6, H-11 |
| Week 3 | H-7 through H-12, M-3, M-5 |
| Month 2 | M-1 (oil & gas page), M-2, M-4, M-6, M-7, M-8, M-9 |
| Month 3 | M-10, M-11, L-1 through L-4, L-2 content |

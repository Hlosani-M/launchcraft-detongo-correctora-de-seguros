# SEO Action Plan — Detondo Corretora de Seguros

**Domain:** https://detondocorretora.com
**Overall SEO Health Score:** 60 / 100
**Generated:** 2026-05-24

---

## Priority Definitions

- **Critical** — Blocks indexing, causes penalties, or is a compliance risk. Fix immediately.
- **High** — Significantly impacts rankings or conversion. Fix within 1 week.
- **Medium** — Optimisation opportunity. Fix within 1 month.
- **Low** — Nice to have. Backlog.

---

## Critical

### C-1. Remove ghost routes from sitemap or build the missing pages
**Files:** `app/sitemap.ts`
**Impact:** Google is submitting 20 URLs that 404. Generates "Submitted URL not found" errors in Search Console. Wastes crawl budget and suppresses domain trust.

At minimum, comment out from `ROUTES` until pages are built:
```ts
// "/services/personal",
// "/services/personal/motor",
// "/services/personal/building",
// "/services/personal/home-contents",
// "/services/personal/all-risks",
// "/services/personal/liability",
// "/services/personal/travel",
// "/services/business",
// "/services/mining",
// "/services/reinsurance",
```
Dictionary content for all of these already exists — building the pages is the right long-term action.

---

### C-2. Add HSTS security header
**File:** `next.config.ts`

Add to `securityHeaders`:
```ts
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
```

---

### C-3. Add noindex to the 5 indexed empty pages + remove from sitemap
**Files:** `app/[lang]/faqs/page.tsx`, `app/[lang]/claims/page.tsx`, `app/[lang]/client-support/page.tsx`, `app/[lang]/compliance/page.tsx`, `app/[lang]/partners/page.tsx`

Add to each page's `generateMetadata`:
```ts
robots: { index: false, follow: true },
```

Also remove these routes from `ROUTES` in `app/sitemap.ts` until content is live.

---

### C-4. Fix `treaty.description` draft text in `pt.json`
**File:** `app/[lang]/dictionaries/pt.json` line 660

The Portuguese treaty description has stripped diacritics ("decisao estrategica", "subscricao", "objectivos", "aprecados", "flexiveis"). The English equivalent is polished. This is a CLAUDE.md bilingual contract violation.

Rewrite line 660 with correct diacritics, matching the quality of the `en.json` counterpart. Do not change the English.

---

### C-5. Create Google Business Profile
**External action — no code change**

Create/claim a GBP at the Nova Vida / Kilamba Kiaxi address:
- Primary category: "Insurance agency"
- Include ARSEG licence 112/ASEG/MF/23 in the description
- Use `geral@detondocorretora.com` as the listing email
- Once live, add the GBP URL to `sameAs` in `lib/jsonld.tsx`

---

### C-6. Create `public/llms.txt`
**File:** `public/llms.txt` (create new)

```
# Detondo Corretora de Seguros e Resseguros

> Angolan insurance and reinsurance brokerage founded in 2017, headquartered in Luanda.
> ANPG-certified for the oil & gas sector. Serves corporate clients, energy companies,
> and oil & gas operators across Angola. Bilingual: Portuguese (primary) and English.

## About

Detondo is a licensed insurance and reinsurance brokerage registered and supervised by
ARSEG (Agencia Angolana de Regulacao e Supervisao de Seguros), licence reference
112/ASEG/MF/23. Certified by ANPG (Agencia Nacional de Petroleo, Gas e
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

## Contact

Address: Rua n. 121, casa n. 1262 D, Nova Vida, Kilamba Kiaxi, Luanda, Angola
Telephone: +244 921 545 832 | +244 923 254 449 | +244 946 451 069
Email: geral@detondocorretora.com
```

---

### C-7. Replace Gmail with branded domain email on all public surfaces
**Files:** `lib/jsonld.tsx`, `components/layout/Footer.tsx`, `app/[lang]/contact/page.tsx`

Replace `detondocorretoraseguros@gmail.com` with `geral@detondocorretora.com` in:
- JSON-LD `email` property (`lib/jsonld.tsx`)
- Footer `mailto:` href and visible text
- Contact page `mailto:` href and visible text

Verify that the address is consistent in both pt and en. If the email is hardcoded in JSX (not routed through the dictionary), update the raw string in each file.

---

### C-8. Compress oversized images
**Files:** `public/personal/personal-liability.jpg` (3.5 MB), `public/personal/building-cover.jpg` (3.5 MB), `public/sectors/mining.jpg` (3.2 MB)

Compress all three files to under 350 KB at their display dimensions before the next deploy. Use:
```bash
npx @squoosh/cli --mozjpeg '{"quality":75}' public/personal/personal-liability.jpg
npx @squoosh/cli --mozjpeg '{"quality":75}' public/personal/building-cover.jpg
npx @squoosh/cli --mozjpeg '{"quality":75}' public/sectors/mining.jpg
```

Also compress remaining high-size images:
- `sectors/oil-gas.jpg` (1.6 MB) → < 200 KB
- `sectors/corporate.jpg` (1.5 MB) → < 200 KB
- `personal/travel.jpg` (1.5 MB) → < 200 KB
- `public/*.jpg` root images (all 864 KB–1.2 MB) → < 400 KB each

---

## High

### H-1. Add `Testimonials` component to homepage
**File:** `app/[lang]/page.tsx`

The `Testimonials` component exists with copy in both dictionaries. It is simply not imported or rendered on the homepage.

Add the import and insert `<Testimonials dict={dict.testimonials} />` at an appropriate position (before `CtaBand`). This is a one-line fix that restores three client trust signals.

---

### H-2. Extract `siteUrl` to a shared constant; use absolute URLs in canonicals
**Files:** `lib/constants.ts` (create), all `generateMetadata` functions

Create `lib/constants.ts`:
```ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://detondocorretora.com";
```

Update all `generateMetadata` to use:
```ts
import { siteUrl } from "@/lib/constants";
// ...
canonical: `${siteUrl}/${lang}/about`,
languages: {
  pt: `${siteUrl}/pt/about`,
  en: `${siteUrl}/en/about`,
  "x-default": `${siteUrl}/pt/about`,
},
```

This makes canonicals absolute (not relative) and eliminates the `metadataBase` fragility.

---

### H-3. Populate `sameAs` in JSON-LD
**File:** `lib/jsonld.tsx`

Replace `sameAs: []` with at minimum:
```ts
sameAs: [
  // Add when available:
  // "https://www.linkedin.com/company/detondo-corretora-de-seguros",
  // "https://www.arseg.ao/...detondo-listing-url...",
  // "https://www.anpg.co.ao/...supplier-registry-url...",
],
```

Create the LinkedIn company page immediately and add the URL. The ARSEG and ANPG registry URLs should be added once confirmed.

---

### H-4. Fix `areaServed` and `url` in JSON-LD
**File:** `lib/jsonld.tsx`

Change:
```ts
areaServed: ["AO", "Africa"],
url: `${siteUrl}/${lang}`,
```

To:
```ts
areaServed: { "@type": "Country", "name": "Angola" },
url: siteUrl,
```

---

### H-5. Add `openingHoursSpecification` to schema
**File:** `lib/jsonld.tsx`

Add to the InsuranceAgency payload:
```ts
openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
],
```

---

### H-6. Add `generateMetadata` to home page
**File:** `app/[lang]/page.tsx`

Add an explicit `generateMetadata` export following the `about/page.tsx` pattern, with the home route's own `alternates.languages` block.

---

### H-7. Fix missing security headers
**File:** `next.config.ts`

Add to `securityHeaders`:
```ts
{ key: "X-DNS-Prefetch-Control", value: "off" },
{ key: "X-Permitted-Cross-Domain-Policies", value: "none" },
{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
{ key: "Cross-Origin-Resource-Policy", value: "same-origin" },
```

---

### H-8. Delete boilerplate files from `public/`

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
find public -name ".DS_Store" -delete
echo "**/.DS_Store" >> .gitignore
```

Verify `logo-dark.jpg` is actively referenced in a component; if not, delete it.

---

### H-9. Fix AI filler phrases in vision copy (both dictionaries)
**Files:** `app/[lang]/dictionaries/pt.json` (line ~288), `app/[lang]/dictionaries/en.json` (same key)

Replace `vision.description` ("Ser um fornecedor global de escolha..." / "To be a global risk solutions provider of choice...") with a concrete, specific statement of what Detondo does for Angolan clients.

Also rewrite `vision.valuesDescription` ("We hold the highest standards in everything we do") in both locales.

Per CLAUDE.md section 7: replace in both files in the same commit.

---

### H-10. Fix missing diacritics in PT legal page content
**File:** `app/[lang]/dictionaries/pt.json`

Proofread and restore correct Portuguese diacritics in all `legalPages.*` PT body entries (Privacy Policy, Terms, AML/KYC, Regulatory Notice). Words to fix include "responsavel", "informacoes", "subscricao", "obrigacoes", "regulatorio", "politicas", "governacao". The English counterparts are correct — compare as reference.

---

### H-11. Fix meta description diacritics
**File:** `app/[lang]/dictionaries/pt.json`

Restore diacritics in:
- `meta.faqs.description`: "servicos" → "serviços"
- `meta.claims.description`: "gestao" → "gestão"
- `meta.compliance.description`: "regulatorio" → "regulatório", "politicas" → "políticas", "governacao" → "governação"

Update corresponding keys in `en.json` if affected (likely not, but verify).

---

### H-12. Fix Google Analytics / cookie consent gap
**File:** `app/[lang]/layout.tsx`

`<GoogleAnalytics>` mounts unconditionally. Wrap it in a client component that reads the consent state from `localStorage` before rendering.

Example client wrapper:
```tsx
"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

export function ConsentedAnalytics({ gaId }: { gaId: string }) {
  const [consented, setConsented] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("detondo-cookie-consent");
    if (stored) {
      try {
        const { analytics } = JSON.parse(stored);
        if (analytics) setConsented(true);
      } catch {}
    }
  }, []);
  return consented ? <GoogleAnalytics gaId={gaId} /> : null;
}
```

---

### H-13. Add `foundingDate` and `identifier` to schema
**File:** `lib/jsonld.tsx`

Add to the InsuranceAgency payload:
```ts
foundingDate: "2017",
identifier: {
  "@type": "PropertyValue",
  name: "ARSEG Licence",
  value: "112/ASEG/MF/23",
},
```

---

### H-14. Add geo meta tags
**File:** `app/[lang]/layout.tsx` — `generateMetadata`

Add to the `other` field in the layout metadata (already has `google: "notranslate"`):
```ts
other: {
  google: "notranslate",
  "geo.region": "AO-LUA",
  "geo.placename": "Luanda, Angola",
  "geo.position": "-8.90350;13.24410",
  ICBM: "-8.90350, 13.24410",
},
```

---

### H-15. Add `BreadcrumbList` schema to service pages
**File:** `lib/jsonld.tsx` (add new export), service page files

Create a `BreadcrumbJsonLd` component in `lib/jsonld.tsx` and render it on `/services/`, `/services/[category]/`, and `/services/personal/[product]/` pages. Names must come from the dictionary to maintain the bilingual contract.

---

### H-16. Add Logo alt text
**File:** `components/layout/Logo.tsx`

Change `alt=""` to `alt="Detondo Corretora de Seguros"`.

Verify this is routed through the dictionary if the project's bilingual contract requires it (`dict.common.brand` or similar).

---

### H-17. Re-export partner logos in correct format
**Files:** `public/partners/nossa-logo.png`, `public/partners/ensa-logo.jpg`, `public/partners/alianca.jpeg`

- `nossa-logo.png` (384 KB): Re-export from vector source at 320x120px. Target < 30 KB. If vector source is available, save as SVG.
- `ensa-logo.jpg` and `alianca.jpeg`: Re-export as PNG to support transparency.

---

## Medium

### M-1. Add `WebSite` schema
**File:** `lib/jsonld.tsx`

Add a `WebSiteJsonLd` export and render alongside `OrganizationJsonLd` in `app/[lang]/layout.tsx`.

---

### M-2. Add dedicated oil-and-gas / ANPG service page
**New file:** `app/[lang]/services/[category]/page.tsx` (already exists for routing) — or a dedicated route

Create a page at `/services/oil-gas` (or expand the business category page) with:
- 600+ words on upstream, midstream, downstream coverages
- Inline ANPG certificate number and PDF link
- ARSEG licence reference
- CTA pre-wired with `?topic=oilgas`
- Metadata targeting "seguro petróleo gás Angola" and "ANPG corretora seguros"
- `Service` schema with `serviceType: "Oil and Gas Insurance"` and `areaServed: "AO"`

This is the highest-priority content investment on the site.

---

### M-3. Add descriptions to `business.items` in both dictionaries
**Files:** `app/[lang]/dictionaries/pt.json`, `app/[lang]/dictionaries/en.json`

Add a `description` field to each item in `business.items`. At minimum 2-3 sentences per line. For oil-and-gas, marine, energy, and construction all risks: target 100-150 words each.

Update both dictionaries in the same commit (bilingual contract).

---

### M-4. Add `Service` schema to service category pages
**Files:** `app/[lang]/services/[category]/page.tsx`, `lib/jsonld.tsx`

Add a `ServiceJsonLd` component. Render on all service category pages with `provider`, `areaServed`, `serviceType`, and `hasOfferCatalog` populated from the dictionary.

---

### M-5. Add Google Maps embed or directions link to contact page
**File:** `app/[lang]/contact/page.tsx`

At minimum: wrap the address text in a link to Google Maps:
```tsx
<a href="https://maps.google.com/?q=Rua+121+casa+1262D+Nova+Vida+Kilamba+Kiaxi+Luanda+Angola" target="_blank" rel="noopener">
  {dict.contact.address}
</a>
```

Once GBP is live, embed the full Google Maps iframe.

---

### M-6. Fix sitemap: remove `priority`/`changeFrequency`, fix `lastModified`
**File:** `app/sitemap.ts`

Remove both `changeFrequency` and `priority` fields (Google ignores them).

For `lastModified`: either omit the field entirely, or create a `ROUTE_DATES` map and update it when content changes.

---

### M-7. Remove `host` directive from `robots.ts`
**File:** `app/robots.ts`

Remove the `host` field — it is a Yandex-only extension ignored by Google.

---

### M-8. Add WhatsApp contact channel
**Files:** `app/[lang]/contact/page.tsx`, `components/layout/Header.tsx`, `lib/jsonld.tsx`

Add a WhatsApp link (using the primary phone number) to the contact page and the floating mobile CTA. Add a `contactPoint` entry in `lib/jsonld.tsx` with `contactType: "sales"` and the WhatsApp URL. This matches real user behaviour in the Angola market.

Update both `pt.json` and `en.json` with the WhatsApp label string.

---

### M-9. Fix address separator in JSON-LD
**File:** `lib/jsonld.tsx`

Change `"Nova Vida - Kilamba Kiaxi"` to `"Nova Vida, Kilamba Kiaxi"` in the `streetAddress` value (comma, not hyphen) to match all other surfaces.

---

### M-10. Build FAQ page with `FAQPage` schema
**Files:** `app/[lang]/faqs/page.tsx`, `app/[lang]/dictionaries/pt.json`, `app/[lang]/dictionaries/en.json`, `lib/jsonld.tsx`

Create the FAQ content in both dictionaries. Suggested questions:
- "O que é a Detondo Corretora de Seguros?" / "What is Detondo?"
- "A Detondo está autorizada para actuar em Angola?" / "Is Detondo licensed in Angola?"
- "Que tipos de seguros fornece a Detondo?" / "What types of insurance does Detondo offer?"
- "O que é o seguro de petróleo e gás?" / "What is oil and gas insurance?"
- "Como solicito uma cotação?" / "How do I request a quote?"
- "Quais as seguradoras com que a Detondo trabalha?" / "Which insurers does Detondo work with?"
- "O que cobre o seguro corporativo?" / "What does corporate insurance cover?"

Each answer should be 130-160 words, starting with a direct factual sentence naming Detondo, ending with the ARSEG or ANPG reference.

Add `FAQPage` JSON-LD to the page. Remove `noindex` only after content is live.

---

### M-11. Add desktop navigation dropdown for service categories
**File:** `components/layout/Header.tsx`

Add a dropdown under "Services" with direct links to Personal / Business / Reinsurance category pages. Reduces path to any category from 2 clicks to 1.

---

### M-12. Add Mining to mobile sub-navigation
**File:** `components/layout/Header.tsx`

Mining is a valid route (`/services/mining`) with its own content but is missing from the mobile Services sub-nav items.

---

### M-13. Expand commitment pillar copy to citation threshold
**Files:** `app/[lang]/dictionaries/pt.json`, `app/[lang]/dictionaries/en.json`

Expand each `commitment.pillars` description from 30-50 words to 130-160 words. Target structure: direct-answer opening sentence + 2-3 concrete process steps + closing sentence with ARSEG/ANPG credential. Update both locales in the same commit.

---

### M-14. Add `inLanguage` removal from InsuranceAgency schema
**File:** `lib/jsonld.tsx`

Remove `inLanguage` from the InsuranceAgency payload — this property belongs on `WebPage`/`WebSite`, not `Organization`. Move it to the `WebSite` schema block (see M-1).

---

### M-15. Add `knowsAbout` to schema
**File:** `lib/jsonld.tsx`

Add to InsuranceAgency payload:
```ts
knowsAbout: [
  "insurance brokerage",
  "reinsurance",
  "oil and gas insurance",
  "Angola insurance market",
  "corporate risk management",
  "ANPG certified insurance",
],
```

---

## Low

### L-1. Remove unused `Geist_Mono` font
**File:** `app/[lang]/layout.tsx`

If `--font-geist-mono` is not applied anywhere in the codebase, remove the `Geist_Mono` import and its class from the `<html>` element.

```bash
grep -r "font-mono\|geist-mono" components app --include="*.tsx" --include="*.ts" --include="*.css"
```

---

### L-2. Add question-form H2/H3 headings on key pages
**Files:** About page, service category pages, business items

Rephrase at least 2-3 section headings per high-value page into question form ("Que sectores cobre a Detondo?" / "Which sectors does Detondo cover?"). This triggers AI Overview matching for informational queries.

Update in both dictionaries.

---

### L-3. Add `hasCredential` for ANPG certificate to schema
**File:** `lib/jsonld.tsx`

```ts
hasCredential: [
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "licence",
    name: "ANPG Supplier Certification",
    issuedBy: {
      "@type": "GovernmentOrganization",
      name: "Agência Nacional de Petróleo, Gás e Biocombustíveis (ANPG)",
      url: "https://www.anpg.co.ao",
    },
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "licence",
    name: "ARSEG Insurance Broker Licence",
    value: "112/ASEG/MF/23",
    issuedBy: {
      "@type": "GovernmentOrganization",
      name: "Agência Angolana de Regulação e Supervisão de Seguros (ARSEG)",
      url: "https://www.arseg.ao",
    },
  },
],
```

---

### L-4. Add partner entity names to logo alt text
**File:** `components/sections/Partners.tsx`

Verify `alt={name}` is rendering the full insurer name for each partner logo. "Swiss Re logo", "Munich Re logo", "Lloyd's of London logo" — complete names help AI entity disambiguation.

---

### L-5. Fix ARSEG alt text separator
**File:** `components/sections/ArSegCompliance.tsx`

Change `"ARSEG - Agencia..."` to `"ARSEG: Agencia..."` (colon not dash, per copy-voice rules).

---

### L-6. Add explicit OG image declaration
**File:** `app/[lang]/layout.tsx`

Add to the `openGraph` block:
```ts
images: [
  {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: "Detondo Corretora de Seguros e Resseguros — Luanda, Angola",
  },
],
```

---

### L-7. Align title separator to `|` across layout and dictionaries
**File:** `app/[lang]/layout.tsx`

The template uses ` · ` (middle dot). CLAUDE.md specifies ` | `. Decide on one convention. First verify whether child page titles already include the brand name suffix — if they do, the template suffix is redundant and should be removed entirely.

---

### L-8. Route menu `aria-label` through dictionary
**File:** `components/layout/Header.tsx`

The mobile menu button `aria-label="Menu"` is hardcoded. Add `dict.common.nav.menuLabel` to both dictionaries and use it as the label.

---

### L-9. Add geo coordinates to schema
**File:** `lib/jsonld.tsx`

Add to InsuranceAgency payload:
```ts
geo: {
  "@type": "GeoCoordinates",
  latitude: -8.9035,
  longitude: 13.2441,
},
```

---

### L-10. Add SLA statement to contact page
**Files:** `app/[lang]/dictionaries/pt.json`, `app/[lang]/dictionaries/en.json`

Add a concrete response commitment to the contact page description. "We aim to respond within one business day" is stronger than "brevemente". Update both locales.

---

## Summary by File

| File | Actions |
|---|---|
| `next.config.ts` | C-2 (HSTS), H-7 (security headers), H-12 (GA consent) |
| `app/sitemap.ts` | C-1 (ghost routes), M-6 (priority/changeFrequency/lastModified) |
| `app/robots.ts` | M-7 (remove host directive) |
| `app/[lang]/layout.tsx` | H-6 (home generateMetadata), H-14 (geo meta), L-6 (OG image), L-7 (title separator) |
| `app/[lang]/page.tsx` | H-1 (add Testimonials), H-6 (generateMetadata) |
| `app/[lang]/faqs/page.tsx` | C-3 (noindex) → M-10 (build content) |
| `app/[lang]/claims/page.tsx` | C-3 (noindex) |
| `app/[lang]/client-support/page.tsx` | C-3 (noindex) |
| `app/[lang]/compliance/page.tsx` | C-3 (noindex) |
| `app/[lang]/partners/page.tsx` | C-3 (noindex) |
| `app/[lang]/contact/page.tsx` | C-7 (email), M-5 (maps), M-8 (WhatsApp) |
| `app/[lang]/dictionaries/pt.json` | C-4 (treaty draft), H-9 (vision), H-10 (legalPages diacritics), H-11 (meta descriptions), M-3 (business.items), M-10 (FAQs content), M-13 (commitment pillars) |
| `app/[lang]/dictionaries/en.json` | H-9 (vision), M-3, M-10, M-13 (all in-sync with PT) |
| `lib/jsonld.tsx` | H-3 (sameAs), H-4 (areaServed/url), H-5 (openingHours), H-13 (foundingDate/identifier), H-15 (BreadcrumbList), M-4 (Service schema), M-1 (WebSite schema), M-9 (address separator), M-14 (remove inLanguage), M-15 (knowsAbout), L-3 (hasCredential), L-9 (geo) |
| `lib/constants.ts` | H-2 (create siteUrl constant) |
| `components/layout/Logo.tsx` | H-16 (alt text) |
| `components/layout/Header.tsx` | M-11 (dropdown nav), M-12 (mobile mining nav), L-8 (aria-label) |
| `components/layout/Footer.tsx` | C-7 (email) |
| `components/sections/ArSegCompliance.tsx` | L-5 (alt text separator) |
| `components/sections/Partners.tsx` | L-4 (partner alt text) |
| `public/` | C-6 (llms.txt), C-8 (image compression), H-8 (delete boilerplate files) |
| `public/partners/` | H-17 (re-export logos) |

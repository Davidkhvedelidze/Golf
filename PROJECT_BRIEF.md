# Golf Tech Affiliate Site — Project Brief

## Context

I'm building an SEO-focused affiliate content site in the golf tech niche (launch monitors, rangefinders, GPS watches; simulators later). Target audience: US/EU beginner-to-mid-handicap golfers looking for budget-to-midrange gear ($200–800). Revenue model: affiliate commissions (PlayBetter, The Indoor Golf Shop, Rain or Shine Golf, Amazon as fallback).

I'm an experienced frontend dev (Next.js, TypeScript, Tailwind, Sanity, Vercel — same stack as my previous project tripmategeorgia.com). Build with my familiar stack.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Sanity CMS for content
- Vercel for hosting
- GA4 + Google Search Console

## MVP Scope (keep it minimal — content is the priority, not the site)

Pages:

1. Home — hero with value prop, featured articles, category links
2. Category page `/[category]` (e.g. /launch-monitors) — intro text block (SEO) + article grid
3. Article page `/[category]/[slug]` — the core template
4. About page (E-E-A-T: who we are, how we test/research)
5. /affiliate-disclosure and /privacy-policy (required by affiliate programs + FTC)

NO dark mode, NO animations, NO fancy hero. Clean, fast, trustworthy.

## Design Direction — must NOT look AI-generated

This site must feel like it was designed by a person with taste, not assembled from defaults. Hard rules:

**Banned (the "AI template" tells):**

- Inter/Roboto + generic sans everywhere
- Purple/indigo gradients, glassmorphism, glow effects
- Emoji as icons, generic feature-card grids with centered icons
- Rounded-2xl cards with soft shadows on everything
- Generic hero: "Find the best golf tech" + two buttons + stock photo
- Perfectly symmetric, evenly-padded, interchangeable-with-any-startup layout

**Instead, aim for an editorial/magazine feel — like a well-run enthusiast publication:**

- Typography does the heavy lifting: a characterful serif or slab for headlines (e.g. from Google Fonts: Fraunces, Zilla Slab, or Source Serif 4), a highly readable sans/serif for body. Big, confident headline sizes.
- Color: warm off-white background (not pure #fff), near-black text (not pure #000), one deep green accent used sparingly (links, buttons, verdict box border) + one warm secondary (e.g. muted amber) for ratings/highlights. No gradients.
- Layout with editorial character: asymmetric article headers, generous whitespace, visible hairline dividers, numbered sections in best-of pages, pull-quote style verdict boxes. Think print magazine adapted to web, not SaaS landing page.
- Details that signal a human: visible "Last updated" dates, author byline with real bio, honest rating displays (7.8/10, not five gold stars), footnote-style price disclaimers.
- Data presented beautifully: comparison tables are the hero element of this site — design them with care (tabular numbers font-feature, subtle row hover, clear winner highlighting) rather than as default Tailwind tables.

Reference points for feel (not to copy): the editorial confidence of a print gear magazine, the data-forward trust of Wirecutter, the visual cleanliness of mygolfspy.com. When in doubt: quieter, more typographic, more editorial.

## Sanity Schemas

### product

- name, brand, slug, image
- priceUSD (number), priceNote (string, e.g. "as of Jul 2026")
- specs: array of { label, value }
- affiliateLinks: array of { retailer (string), url (url) }
- rating (number 1–10), pros: string[], cons: string[]
- bestFor (string, e.g. "beginners with swing speed under 90mph")

### article

- title, slug, metaDescription
- type: "review" | "comparison" | "best-of"
- category: reference → category
- products: array of references → product
- body: portable text (support inline components: comparison table, verdict box, pros/cons, affiliate button, image with caption)
- publishedAt, updatedAt (show "Last updated" on page — Google rewards freshness)
- faq: array of { question, answer } → rendered + FAQPage JSON-LD

### category

- name, slug, description (rendered as intro text on category page)

### author (single doc for now)

- name, bio, photo — displayed on articles for E-E-A-T

## Key Components

1. **ComparisonTable** — sticky first column, product specs side by side, "Check price →" button per product. Main conversion tool.
2. **VerdictBox** — top of article: "Our pick: X — best for most golfers" with CTA. Most readers skim to the verdict.
3. **AffiliateButton** — single component for ALL affiliate links. Must have rel="sponsored nofollow", target="\_blank", and fire a GA4 event (event name: affiliate_click, params: article_slug, product, retailer) so I can see which articles convert.
4. **ProsCons** — two-column green/red block.
5. **DisclosureBanner** — one-liner at top of every article: "We may earn a commission if you buy through our links. This doesn't affect our recommendations." Links to /affiliate-disclosure.
6. **AuthorByline** — author + published/updated dates.

## SEO Requirements (critical — this is the whole business)

- Dynamic metadata (title, description, OG) per page
- sitemap.xml + robots.txt
- JSON-LD structured data: Product + Review schema on reviews, ItemList on best-of pages, FAQPage where faq exists, BreadcrumbList everywhere
- Breadcrumbs UI on article + category pages
- Internal linking: article template should render a "Related articles" section (same category)
- next/image everywhere, target green Core Web Vitals
- Canonical URLs

## Deploy

Deploy to Vercel. Domain not purchased yet — use the vercel.app preview URL for now, domain gets attached later.

## Working style

- Build the skeleton first, then we'll refine. Don't gold-plate — I have a strict rule: max 5–7 days on the site, then 100% content production.
- After the skeleton runs, seed Sanity with 2 sample products (Garmin Approach R10, Rapsodo MLM2Pro) and 1 draft comparison article so every component renders with real-ish data.

## First 5 articles (for context on what the site must support)

1. Garmin R10 vs Rapsodo MLM2Pro — which is worth it in 2026 (comparison)
2. Swing Caddie SC4 Pro vs Garmin R10 (comparison)
3. Best launch monitors under $300 (best-of)
4. Shot Scope LM1 review — the $199 alternative (review)
5. Launch monitors for small indoor spaces: space requirements compared (best-of/guide)

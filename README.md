This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Sanity on-demand revalidation

Publishing a document in Sanity Studio hits `POST /api/revalidate`
([app/api/revalidate/route.ts](app/api/revalidate/route.ts)), which calls
`revalidateTag(tag, { expire: 0 })` for every tag the webhook sends. `{ expire: 0 }`
matters here — Next 16's `revalidateTag(tag, "max")` only marks a tag *stale*
for background stale-while-revalidate, so the very next visitor could still get
the old page. `{ expire: 0 }` forces an immediate expiry so the change is live
on the next request, regardless of each page's `next.revalidate` interval
(those intervals are just a fallback ceiling — on-demand always wins).

Every `client.fetch(...)` call in [sanity/queries.ts](sanity/queries.ts) /
the page files is tagged (`article`, `article:<slug>`, `category`,
`category:<slug>`, `aboutPage`, `author`). The webhook doesn't call
`revalidatePath` — it sends a `tags` array shaped by a GROQ projection, and
the route just revalidates those tags. Because the homepage's featured-articles
fetch is tagged `article`/`category` too, it invalidates automatically
whenever an article or category changes — no separate homepage-specific logic
needed.

**One-time setup (do this in [sanity.io/manage](https://sanity.io/manage) →
project `saiifvnw` → API → Webhooks — couldn't be scripted from here, the
Sanity CLI on this machine needs Node ≥22.12 and we're on 20.19):**

1. Create a webhook:
   - **Name**: `Next.js revalidate`
   - **URL**: `https://swingverdict.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["article", "category", "product", "aboutPage"]`
   - **Projection**:
     ```groq
     {
       "tags": select(
         _type == "article" => [
           "article",
           "article:" + slug.current,
           "category:" + category->slug.current
         ],
         _type == "category" => [
           "category",
           "category:" + slug.current
         ],
         _type == "product" => ["article", "category"],
         _type == "aboutPage" => ["aboutPage"],
         []
       )
     }
     ```
   - **HTTP method**: POST
   - **Secret**: same value as the `SANITY_REVALIDATE_SECRET` env var below (Sanity signs the payload with this and puts it in the `sanity-webhook-signature` header, which `parseBody()` verifies)
2. Set `SANITY_REVALIDATE_SECRET` in Vercel → Project Settings → Environment
   Variables → **Production** (it already exists in `.env.local` for dev, but
   that file isn't deployed). Use the same value in both places.

**Debugging:** Sanity → API → Webhooks → click the webhook → "Attempts" tab
shows each delivery, response status, and body — check there first if a
publish doesn't show up on the site. A 401 means the secret doesn't match; a
400 "Missing tags" means the projection didn't return a `tags` array (often
because `_type` didn't match one of the `select()` branches).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

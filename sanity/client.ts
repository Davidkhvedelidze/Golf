import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-01',
  useCdn: true,
  // Never let draft content leak onto the public site.
  perspective: 'published',
})

// generateStaticParams needs the freshest published data, not a CDN-cached view.
export const staticParamsClient = client.withConfig({ useCdn: false })

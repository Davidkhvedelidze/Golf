import { createClient } from 'next-sanity'

export const client = createClient({
  // These identifiers are public and keep production builds working when the
  // deployment has not explicitly duplicated the local environment variables.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'saiifvnw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-01',
  useCdn: true,
  // Never let draft content leak onto the public site.
  perspective: 'published',
})

// generateStaticParams needs the freshest published data, not a CDN-cached view.
export const staticParamsClient = client.withConfig({ useCdn: false })

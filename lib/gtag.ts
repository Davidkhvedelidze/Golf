import { GA_MEASUREMENT_ID } from './site'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackAffiliateClick(params: {
  articleSlug: string
  product: string
  retailer: string
}) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'affiliate_click', {
    article_slug: params.articleSlug,
    product: params.product,
    retailer: params.retailer,
  })
}

export const SITE_NAME = 'SwingVerdict'
export const SITE_TAGLINE = 'Real costs. Real space. Real verdicts.'
const FALLBACK_SITE_URL =
  process.env.VERCEL_ENV === 'production'
    ? 'https://swingverdict.com'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '')
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

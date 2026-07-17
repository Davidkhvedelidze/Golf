export interface SanityImage {
  asset?: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: { width: number; height: number }
    }
  }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SpecItem {
  label: string
  value: string
}

export interface AffiliateLink {
  retailer: string
  url: string
}

export interface SubscriptionInfo {
  name?: string
  pricePerYear?: number
  required?: boolean
  trialDays?: number
}

export interface SpaceInfo {
  // Absent = not yet specified; 0 = explicitly no depth requirement.
  roomDepthFt?: number
  placement?: 'behind ball' | 'side'
  placementDetail?: string
  indoorOk?: boolean
  outdoorOk?: boolean
}

export interface Product {
  _id: string
  name: string
  brand: string
  slug: string
  image: SanityImage
  priceUSD: number
  priceNote?: string
  specs?: SpecItem[]
  affiliateLinks: AffiliateLink[]
  rating: number
  pros?: string[]
  cons?: string[]
  bestFor?: string
  subscription?: SubscriptionInfo
  space?: SpaceInfo
}

export interface CategoryRef {
  name: string
  slug: string
}

export interface Category extends CategoryRef {
  _id: string
  description: string
}

export interface Author {
  name: string
  bio: string
  email?: string
  linkedinUrl?: string
  photo?: SanityImage
}

export interface FaqItem {
  question: string
  answer: string
}

export type ArticleType = 'review' | 'comparison' | 'best-of'

export interface ComparisonTableBlock {
  _type: 'comparisonTable'
  _key: string
  title?: string
  products: Product[]
}

export interface VerdictBoxBlock {
  _type: 'verdictBox'
  _key: string
  heading?: string
  product: Product
  text: string
  ctaLabel?: string
}

export interface ProsConsBlock {
  _type: 'prosCons'
  _key: string
  pros: string[]
  cons: string[]
}

export interface AffiliateButtonBlock {
  _type: 'affiliateButton'
  _key: string
  product: Product
  retailer?: string
  label?: string
}

export interface PteImageBlock {
  _type: 'pteImage'
  _key: string
  image: SanityImage
  alt: string
  caption?: string
}

export interface TrueCostBoxBlock {
  _type: 'trueCostBox'
  _key: string
  title?: string
  products: Product[]
}

export interface SpaceRequirementsBlock {
  _type: 'spaceRequirements'
  _key: string
  title?: string
  products: Product[]
}

export type ArticleBodyBlock =
  | ComparisonTableBlock
  | VerdictBoxBlock
  | ProsConsBlock
  | AffiliateButtonBlock
  | PteImageBlock
  | TrueCostBoxBlock
  | SpaceRequirementsBlock
  // Standard Portable Text text block — left loose since @portabletext/react types it internally
  | { _type: 'block'; _key: string; [key: string]: unknown }

export interface ArticleCard {
  _id: string
  title: string
  slug: string
  type: ArticleType
  metaDescription: string
  publishedAt: string
  updatedAt?: string
  categorySlug: string
  categoryName?: string
  heroImage?: SanityImage
}

// Plain paragraph-only Portable Text (no custom blocks) — used for simple
// CMS-editable prose like the About page's intro and "what we do" copy.
export type SimplePortableText = { _type: 'block'; _key: string; [key: string]: unknown }[]

export interface WhatWeDoItem {
  term: string
  description: SimplePortableText
}

export interface AboutPageContent {
  metaDescription: string
  headline: string
  intro: SimplePortableText
  pullQuote: string
  whatWeDoIntro?: string
  whatWeDo: WhatWeDoItem[]
}

export interface Article {
  _id: string
  title: string
  slug: string
  metaDescription: string
  type: ArticleType
  category: CategoryRef
  author: Author
  products: Product[]
  body: ArticleBodyBlock[]
  publishedAt: string
  updatedAt?: string
  faq?: FaqItem[]
}

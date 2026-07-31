import type {
  AboutPage,
  BreadcrumbList,
  FAQPage,
  ItemList,
  Offer,
  Organization,
  Person,
  Product as SchemaProduct,
  WebSite,
  WithContext,
} from "schema-dts";
import type { Article, Author, FaqItem, Product } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import { pickAffiliateLink } from "@/lib/product";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export function buildOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
  };
}

export function buildWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: SITE_URL,
  };
}

export function buildBreadcrumbJsonLd(
  items: { label: string; href: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// Google requires a Product to carry offers, review, or aggregateRating.
// We always have a price once a product is publishable, so offers is the
// one we can guarantee; fall back to the article URL until an affiliate
// link is approved. There's no discontinued/unavailable signal in the
// product schema yet, so InStock is the only availability we can assert.
function buildProductOffer(product: Product, fallbackUrl: string): Offer {
  return {
    "@type": "Offer",
    url: pickAffiliateLink(product)?.url ?? fallbackUrl,
    priceCurrency: "USD",
    price: product.priceUSD,
    availability: "https://schema.org/InStock",
  };
}

export function buildProductReviewJsonLd(
  product: Product,
  article: Article,
  articleUrl: string
): WithContext<SchemaProduct> | null {
  if (!product.priceUSD) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    image: product.image?.asset?.url ? urlFor(product.image).width(1200).url() : undefined,
    description: article.metaDescription,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating,
        bestRating: 10,
        worstRating: 1,
      },
      author: { "@type": "Person", name: article.author.name },
      datePublished: article.publishedAt,
    },
    offers: buildProductOffer(product, articleUrl),
  };
}

export function buildItemListJsonLd(
  products: Product[],
  articleUrl: string
): WithContext<ItemList> | null {
  const withPrice = products.filter((product) => product.priceUSD);
  if (withPrice.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: withPrice.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image?.asset?.url ? urlFor(product.image).width(800).url() : undefined,
        url: articleUrl,
        offers: buildProductOffer(product, articleUrl),
      },
    })),
  };
}

export function buildAboutPageJsonLd(description: string): WithContext<AboutPage> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About",
    url: `${SITE_URL}/about`,
    description,
  };
}

export function buildPersonJsonLd(author: Author): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${SITE_URL}/about`,
    ...(author.email ? { email: author.email } : {}),
    ...(author.linkedinUrl ? { sameAs: [author.linkedinUrl] } : {}),
  };
}

export function buildFaqJsonLd(faq: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

import type {
  AboutPage,
  BreadcrumbList,
  FAQPage,
  ItemList,
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

export function buildProductReviewJsonLd(
  product: Product,
  article: Article
): WithContext<SchemaProduct> {
  const link = pickAffiliateLink(product);
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
    ...(link
      ? {
          offers: {
            "@type": "Offer",
            price: product.priceUSD,
            priceCurrency: "USD",
            url: link.url,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function buildItemListJsonLd(products: Product[], articleUrl: string): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image?.asset?.url ? urlFor(product.image).width(800).url() : undefined,
        url: articleUrl,
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

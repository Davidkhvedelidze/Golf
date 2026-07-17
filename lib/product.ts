import type { AffiliateLink, Product } from "@/sanity/types";

export function pickAffiliateLink(product: Product, retailer?: string): AffiliateLink | undefined {
  if (retailer) {
    const match = product.affiliateLinks.find(
      (link) => link.retailer.toLowerCase() === retailer.toLowerCase()
    );
    if (match) return match;
  }
  return product.affiliateLinks[0];
}

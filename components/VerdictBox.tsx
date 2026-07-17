import { RatingBadge } from "@/components/RatingBadge";
import { AffiliateButton } from "@/components/AffiliateButton";
import { pickAffiliateLink } from "@/lib/product";
import type { Product } from "@/sanity/types";

export function VerdictBox({
  heading = "Our pick",
  product,
  text,
  ctaLabel,
  articleSlug,
}: {
  heading?: string;
  product: Product;
  text: string;
  ctaLabel?: string;
  articleSlug: string;
}) {
  const link = pickAffiliateLink(product);

  return (
    <aside className="my-8 border-l-4 border-pine bg-amber-soft/40 py-5 pl-6 pr-5">
      <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">{heading}</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <p className="font-display text-2xl italic text-ink">{product.name}</p>
        <RatingBadge rating={product.rating} size="sm" />
      </div>
      <p className="mt-3 max-w-2xl font-body text-[1.05rem] leading-relaxed text-ink">{text}</p>
      {link && (
        <div className="mt-4">
          <AffiliateButton
            articleSlug={articleSlug}
            product={product.name}
            retailer={link.retailer}
            url={link.url}
            label={ctaLabel}
          />
        </div>
      )}
    </aside>
  );
}

import { AffiliateButton } from "@/components/AffiliateButton";
import { RatingBadge } from "@/components/RatingBadge";
import { SanityImage } from "@/components/SanityImage";
import { computeCost } from "@/lib/cost";
import { pickAffiliateLink } from "@/lib/product";
import type { Product } from "@/sanity/types";

export function ComparisonTable({
  title,
  products,
  articleSlug,
}: {
  title?: string;
  products: Product[];
  articleSlug: string;
}) {
  if (!products || products.length === 0) return null;

  const specLabels: string[] = [];
  for (const product of products) {
    for (const spec of product.specs ?? []) {
      if (!specLabels.includes(spec.label)) specLabels.push(spec.label);
    }
  }

  const topRating = Math.max(...products.map((p) => p.rating));

  return (
    <figure className="my-10">
      {title && <p className="mb-3 font-display text-xl text-ink">{title}</p>}
      <div className="overflow-x-auto border border-line">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-[140px] border-b border-line bg-paper p-4 align-bottom font-ui text-xs font-semibold uppercase tracking-wide text-ink-soft"
              >
                &nbsp;
              </th>
              {products.map((product) => {
                const isTop = product.rating === topRating;
                return (
                  <th
                    key={product._id}
                    scope="col"
                    className={`min-w-[220px] border-b border-line p-4 align-bottom font-normal ${
                      isTop ? "bg-amber-soft/40" : "bg-paper"
                    }`}
                  >
                    {isTop && (
                      <span className="mb-2 inline-block font-ui text-[0.65rem] font-semibold uppercase tracking-wide text-amber">
                        Top rated
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      {product.image?.asset && (
                        <SanityImage
                          value={product.image}
                          width={64}
                          height={64}
                          className="h-16 w-16 shrink-0 object-cover"
                        />
                      )}
                      <div>
                        <p className="font-ui text-xs uppercase tracking-wide text-ink-soft">
                          {product.brand}
                        </p>
                        <p className="font-display text-lg leading-tight text-ink">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="group hover:bg-paper/60">
              <th
                scope="row"
                className="sticky left-0 z-10 border-b border-line bg-paper p-4 font-ui text-xs font-semibold uppercase tracking-wide text-ink-soft group-hover:bg-[#f3efe4]"
              >
                Price
              </th>
              {products.map((product) => (
                <td
                  key={product._id}
                  className={`border-b border-line p-4 tabular-nums ${
                    product.rating === topRating ? "bg-amber-soft/20" : ""
                  }`}
                >
                  <span className="font-display text-lg text-ink">${product.priceUSD}</span>
                  {product.priceNote && (
                    <span className="ml-1 text-xs text-ink-soft">({product.priceNote})</span>
                  )}
                </td>
              ))}
            </tr>

            <tr className="group hover:bg-paper/60">
              <th
                scope="row"
                className="sticky left-0 z-10 border-b border-line bg-paper p-4 font-ui text-xs font-semibold uppercase tracking-wide text-ink-soft group-hover:bg-[#f3efe4]"
              >
                Rating
              </th>
              {products.map((product) => (
                <td
                  key={product._id}
                  className={`border-b border-line p-4 ${
                    product.rating === topRating ? "bg-amber-soft/20" : ""
                  }`}
                >
                  <RatingBadge rating={product.rating} size="sm" />
                </td>
              ))}
            </tr>

            {specLabels.map((label) => (
              <tr key={label} className="group hover:bg-paper/60">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-b border-line bg-paper p-4 font-ui text-xs font-semibold uppercase tracking-wide text-ink-soft group-hover:bg-[#f3efe4]"
                >
                  {label}
                </th>
                {products.map((product) => {
                  const value = product.specs?.find((spec) => spec.label === label)?.value;
                  return (
                    <td
                      key={product._id}
                      className={`border-b border-line p-4 tabular-nums text-ink ${
                        product.rating === topRating ? "bg-amber-soft/20" : ""
                      }`}
                    >
                      {value ?? <span className="text-ink-soft">&mdash;</span>}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr className="group hover:bg-paper/60">
              <th
                scope="row"
                className="sticky left-0 z-10 border-b border-line bg-paper p-4 align-top font-ui text-xs font-semibold uppercase tracking-wide text-ink-soft group-hover:bg-[#f3efe4]"
              >
                Best for
              </th>
              {products.map((product) => (
                <td
                  key={product._id}
                  className={`border-b border-line p-4 align-top text-ink ${
                    product.rating === topRating ? "bg-amber-soft/20" : ""
                  }`}
                >
                  {product.bestFor ?? <span className="text-ink-soft">&mdash;</span>}
                </td>
              ))}
            </tr>

            <tr>
              <th scope="row" className="sticky left-0 z-10 bg-paper p-4">
                &nbsp;
              </th>
              {products.map((product) => {
                const link = pickAffiliateLink(product);
                return (
                  <td
                    key={product._id}
                    className={`p-4 ${product.rating === topRating ? "bg-amber-soft/20" : ""}`}
                  >
                    {link && (
                      <AffiliateButton
                        articleSlug={articleSlug}
                        product={product.name}
                        retailer={link.retailer}
                        url={link.url}
                        label="Check price"
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}

import { computeCost } from "@/lib/cost";
import type { Product } from "@/sanity/types";

export function TrueCostBox({ title, products }: { title?: string; products: Product[] }) {
  if (!products || products.length === 0) return null;

  const gridCols =
    products.length === 1
      ? "grid-cols-1"
      : products.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-3";

  return (
    <figure className="my-10 border border-line">
      {title && (
        <figcaption className="border-b border-line px-5 py-3 font-display text-lg text-ink">
          {title}
        </figcaption>
      )}
      <div className={`grid ${gridCols} divide-y divide-line sm:divide-x sm:divide-y-0`}>
        {products.map((product) => {
          const cost = computeCost(product);
          return (
            <div key={product._id} className="p-6">
              <p className="font-ui text-xs uppercase tracking-wide text-ink-soft">
                {product.brand}
              </p>
              <p className="font-display text-lg text-ink">{product.name}</p>

              <div className="mt-5 border-t border-line pt-3">
                <div className="flex items-baseline justify-between">
                  <p className="font-ui text-xs uppercase tracking-wide text-ink-soft">Day one</p>
                  <p className="font-display text-xl tabular-nums text-ink">
                    ${cost.dayOne.toLocaleString()}
                  </p>
                </div>
              </div>

              {!cost.hasSubscription && (
                <div className="mt-4 border-t border-line pt-3">
                  <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">
                    Year one total
                  </p>
                  <p className="mt-1 font-display text-3xl tabular-nums text-ink">
                    ${cost.dayOne.toLocaleString()}
                  </p>
                  <p className="mt-1 font-ui text-xs text-ink-soft">No subscription required.</p>
                </div>
              )}

              {cost.hasSubscription && cost.subscriptionRequired && (
                <div className="mt-4 border-t border-line pt-3">
                  <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">
                    Year one total
                  </p>
                  <p className="mt-1 font-display text-3xl tabular-nums text-ink">
                    ${cost.yearOneRequired!.toLocaleString()}
                  </p>
                  <p className="mt-1 font-ui text-xs text-brick">
                    Subscription required for full features
                    {cost.subscriptionName ? ` — ${cost.subscriptionName}` : ""}.
                  </p>
                </div>
              )}

              {cost.hasSubscription && !cost.subscriptionRequired && (
                <div className="mt-4 border-t border-line pt-3">
                  <div className="flex items-baseline justify-between">
                    <p className="font-ui text-xs uppercase tracking-wide text-ink-soft">
                      Without subscription
                    </p>
                    <p className="font-display text-lg tabular-nums text-ink-soft">
                      ${cost.yearOneWithout!.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">
                      With optional subscription
                    </p>
                    <p className="font-display text-3xl tabular-nums text-ink">
                      ${cost.yearOneWith!.toLocaleString()}
                    </p>
                  </div>
                  {cost.subscriptionName && (
                    <p className="mt-1 font-ui text-xs text-ink-soft">{cost.subscriptionName}</p>
                  )}
                </div>
              )}

              {cost.trialDays > 0 && (
                <p className="mt-4 border-t border-line pt-3 font-ui text-xs text-amber">
                  {cost.trialDays}-day trial included
                </p>
              )}
            </div>
          );
        })}
      </div>
    </figure>
  );
}

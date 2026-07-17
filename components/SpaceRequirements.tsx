import type { Product } from "@/sanity/types";

function roomDepthLabel(roomDepthFt: number | undefined): string {
  if (roomDepthFt === 0) return "No depth requirement — sits beside the ball";
  if (roomDepthFt !== undefined) return `${roomDepthFt} ft room depth`;
  return "Room depth: not yet verified";
}

export function SpaceRequirements({ title, products }: { title?: string; products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <figure className="my-8 border border-line">
      {title && (
        <figcaption className="border-b border-line px-4 py-2 font-display text-base text-ink">
          {title}
        </figcaption>
      )}
      <div className="divide-y divide-line">
        {products.map((product) => {
          const space = product.space;
          return (
            <div key={product._id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-4">
              <p className="font-display text-base text-ink">{product.name}</p>
              {space ? (
                <>
                  <span className="font-ui text-sm tabular-nums text-ink">
                    {roomDepthLabel(space.roomDepthFt)}
                  </span>
                  <span className="font-ui text-xs text-ink-soft">
                    Indoor: {space.indoorOk ? "yes" : "no"} &middot; Outdoor:{" "}
                    {space.outdoorOk ? "yes" : "no"}
                  </span>
                  {space.placementDetail && (
                    <span className="w-full font-ui text-xs text-ink-soft">
                      {space.placementDetail}
                    </span>
                  )}
                </>
              ) : (
                <span className="font-ui text-xs text-ink-soft">
                  Space requirements not yet documented.
                </span>
              )}
            </div>
          );
        })}
      </div>
    </figure>
  );
}

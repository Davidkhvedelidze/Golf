export function RatingBadge({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const textSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <span
      className="inline-flex items-baseline gap-1 border border-amber bg-amber-soft px-3 py-1 font-display text-ink"
      aria-label={`Rating: ${rating.toFixed(1)} out of 10`}
    >
      <span className={`${textSize} tabular-nums font-semibold`}>{rating.toFixed(1)}</span>
      <span className="text-xs text-ink-soft">/10</span>
    </span>
  );
}

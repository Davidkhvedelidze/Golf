"use client";

import { trackAffiliateClick } from "@/lib/gtag";

export function AffiliateButton({
  articleSlug,
  product,
  retailer,
  url,
  label,
  variant = "primary",
}: {
  articleSlug: string;
  product: string;
  retailer: string;
  url: string;
  label?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={() => trackAffiliateClick({ articleSlug, product, retailer })}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 bg-pine px-5 py-2.5 font-ui text-sm font-semibold uppercase tracking-wide text-paper transition-colors hover:bg-pine-dark"
          : "inline-flex items-center gap-2 border border-ink px-5 py-2.5 font-ui text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-pine hover:text-pine"
      }
    >
      {label || `Check price at ${retailer}`}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

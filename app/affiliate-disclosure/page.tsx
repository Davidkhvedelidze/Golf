import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${SITE_NAME} earns commissions and how that affects our recommendations.`,
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-semibold text-ink">Affiliate Disclosure</h1>
      <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-ink">
        <p>
          {SITE_NAME}{" "}
          participates in affiliate programs, including those run by PlayBetter, The Indoor Golf
          Shop, Rain or Shine Golf, and the Amazon Associates Program. This means that when you
          click certain links on this site and make a purchase, we may earn a commission at no
          additional cost to you.
        </p>
        <p>
          Affiliate revenue is how we keep {SITE_NAME}
          {" "}
          free to read and independently funded. It does not influence which products we choose to
          cover, the ratings we assign, or the conclusions in our reviews. We recommend products
          based on their specs, pricing, and fit for the golfer we say they&apos;re best for
          &mdash; the same recommendation we&apos;d make whether or not a link is monetized.
        </p>
        <p>
          Prices and availability shown on this site are accurate as of the date noted on each
          article but are subject to change by the retailer at any time. Always confirm the
          current price on the retailer&apos;s site before purchasing.
        </p>
        <p>
          Links to affiliate offers are marked as sponsored and open in a new tab. If you have
          questions about a specific recommendation or this policy, you&apos;re welcome to reach
          out via the contact information on our About page.
        </p>
      </div>
    </div>
  );
}

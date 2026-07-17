import Link from "next/link";
import { client } from "@/sanity/client";
import { NAV_CATEGORIES_QUERY } from "@/sanity/queries";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import type { CategoryRef } from "@/sanity/types";

export async function Footer() {
  const categories = await client.fetch<CategoryRef[]>(
    NAV_CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["category"] } }
  );

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 font-ui text-sm sm:grid-cols-3">
        <div>
          <p className="font-display text-xl italic text-ink">{SITE_NAME}</p>
          <p className="mt-2 max-w-xs text-ink-soft">{SITE_TAGLINE}</p>
        </div>

        {categories.length > 0 && (
          <div>
            <p className="mb-3 font-medium uppercase tracking-wide text-ink-soft">
              Categories
            </p>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-ink transition-colors hover:text-pine"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="mb-3 font-medium uppercase tracking-wide text-ink-soft">
            About
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-ink transition-colors hover:text-pine">
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/affiliate-disclosure"
                className="text-ink transition-colors hover:text-pine"
              >
                Affiliate disclosure
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-ink transition-colors hover:text-pine">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-6 py-5">
        <p className="mx-auto max-w-6xl font-ui text-xs text-ink-soft">
          &copy; {new Date().getFullYear()} {SITE_NAME}. We may earn a commission if you buy
          through links on this site — see our{" "}
          <Link href="/affiliate-disclosure" className="underline hover:text-pine">
            affiliate disclosure
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

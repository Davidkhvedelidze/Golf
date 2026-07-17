import Link from "next/link";
import { client } from "@/sanity/client";
import { NAV_CATEGORIES_QUERY } from "@/sanity/queries";
import { SITE_NAME } from "@/lib/site";
import type { CategoryRef } from "@/sanity/types";

export async function Header() {
  const categories = await client.fetch<CategoryRef[]>(
    NAV_CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["category"] } }
  );

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-6">
        <Link
          href="/"
          className="font-display text-3xl font-semibold italic tracking-tight text-ink"
        >
          {SITE_NAME}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-ui text-sm font-medium uppercase tracking-wide text-ink-soft">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`} className="transition-colors hover:text-pine">
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="transition-colors hover:text-pine">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

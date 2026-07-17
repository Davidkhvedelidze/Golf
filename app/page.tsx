import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { client } from "@/sanity/client";
import { HOME_QUERY } from "@/sanity/queries";
import type { ArticleCard as ArticleCardData, CategoryRef } from "@/sanity/types";

export default async function HomePage() {
  const { featured, categories } = await client.fetch<{
    featured: ArticleCardData[];
    categories: CategoryRef[];
  }>(HOME_QUERY, {}, { next: { revalidate: 3600, tags: ["article", "category"] } });




  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="grid gap-8 border-b border-line py-14 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-8">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-pine">
            Launch monitors &middot; Rangefinders &middot; GPS watches
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            The spec sheet is marketing. Here&apos;s what we measured.
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
            Independent, hands-on testing of golf tech for the $200&ndash;800 range &mdash; built
            for beginner-to-mid handicap golfers deciding between real options, not chasing tour
            pro gear.
          </p>
        </div>
        <div className="flex flex-col justify-end md:col-span-4">
          <p className="font-ui text-xs uppercase tracking-wide text-ink-soft">Start here</p>
          <ul className="mt-3 space-y-2 border-t border-line pt-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="font-display text-lg text-ink transition-colors hover:text-pine"
                >
                  {category.name} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <h2 className="font-display text-2xl text-ink">Latest reviews &amp; comparisons</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

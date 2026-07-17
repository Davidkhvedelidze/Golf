import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { client, staticParamsClient } from "@/sanity/client";
import { ARTICLES_BY_CATEGORY_QUERY, CATEGORY_QUERY, CATEGORY_SLUGS_QUERY } from "@/sanity/queries";
import type { ArticleCard as ArticleCardData, Category } from "@/sanity/types";

type Props = {
  params: Promise<{ category: string }>;
};

async function getCategory(slug: string) {
  return client.fetch<Category | null>(
    CATEGORY_QUERY,
    { slug },
    { next: { revalidate: 3600, tags: ["category", `category:${slug}`] } }
  );
}

export async function generateStaticParams() {
  const categories = await staticParamsClient.fetch<{ slug: string }[]>(CATEGORY_SLUGS_QUERY);
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const articles = await client.fetch<ArticleCardData[]>(
    ARTICLES_BY_CATEGORY_QUERY,
    { categorySlug: slug },
    { next: { revalidate: 3600, tags: ["article", `category:${slug}`] } }
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category.name, href: `/${slug}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-4 max-w-3xl border-b border-line pb-10">
        <h1 className="font-display text-4xl font-semibold text-ink">{category.name}</h1>
        <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
          {category.description}
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-ink-soft">No articles published in this category yet.</p>
      )}
    </div>
  );
}

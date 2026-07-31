import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorByline } from "@/components/AuthorByline";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { JsonLd } from "@/components/JsonLd";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SanityImage } from "@/components/SanityImage";
import { formatDate } from "@/lib/format";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildProductReviewJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { client, staticParamsClient } from "@/sanity/client";
import {
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  RELATED_ARTICLES_QUERY,
} from "@/sanity/queries";
import type { Article, ArticleCard as ArticleCardData } from "@/sanity/types";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

const TYPE_LABEL: Record<string, string> = {
  review: "Review",
  comparison: "Comparison",
  "best-of": "Best-of",
};

async function getArticle(slug: string) {
  return client.fetch<Article | null>(
    ARTICLE_QUERY,
    { slug },
    { next: { revalidate: 3600, tags: ["article", `article:${slug}`] } },
  );
}

export async function generateStaticParams() {
  const articles =
    await staticParamsClient.fetch<{ category: string | null; slug: string }[]>(
      ARTICLE_SLUGS_QUERY,
    );
  return articles
    .filter((article) => article.category)
    .map((article) => ({ category: article.category!, slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticle(slug);
  if (!article || article.category.slug !== category) return {};

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/${category}/${slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = await getArticle(slug);
  if (!article || article.category.slug !== category) notFound();

  const relatedArticles = await client.fetch<ArticleCardData[]>(
    RELATED_ARTICLES_QUERY,
    { categorySlug: category, slug },
    { next: { revalidate: 3600, tags: ["article", `category:${category}`] } },
  );

  const articleUrl = `${SITE_URL}/${category}/${slug}`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: article.category.name, href: `/${category}` },
    { label: article.title, href: `/${category}/${slug}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      {article.type === "review" && article.products.length === 1 && (
        <JsonLd data={buildProductReviewJsonLd(article.products[0], article, articleUrl)} />
      )}
      {article.type === "best-of" && article.products.length > 0 && (
        <JsonLd data={buildItemListJsonLd(article.products, articleUrl)} />
      )}
      {article.faq && article.faq.length > 0 && (
        <JsonLd data={buildFaqJsonLd(article.faq)} />
      )}

      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-4 border-b border-line pb-6">
        <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">
          {TYPE_LABEL[article.type]} &middot; {article.category.name}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">
          {article.title}
        </h1>
        <p className="mt-3 font-body text-lg text-ink-soft">
          {article.metaDescription}
        </p>
        {article.heroImage?.asset && (
          <div className="mt-6 overflow-hidden">
            <SanityImage
              value={article.heroImage}
              width={1200}
              height={720}
              className="aspect-5/3 w-full object-cover"
              priority
            />
          </div>
        )}
        <div className="mt-5">
          <AuthorByline
            author={article.author}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
          />
        </div>
      </header>

      <div className="mt-6">
        <DisclosureBanner />
      </div>

      <div className="mt-2">
        <PortableTextRenderer body={article.body} articleSlug={slug} />
      </div>

      {article.faq && article.faq.length > 0 && (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-2xl text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {article.faq.map((item, index) => (
              <div key={index}>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.question}
                </h3>
                <p className="mt-1.5 text-ink-soft">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 font-ui text-xs text-ink-soft">
        Prices and availability change often; verify the current price before
        you buy. Last updated{" "}
        {formatDate(article.updatedAt || article.publishedAt)}.
      </p>

      <RelatedArticles articles={relatedArticles} />
    </div>
  );
}

import Link from "next/link";
import { SanityImage } from "@/components/SanityImage";
import { formatDate } from "@/lib/format";
import type { ArticleCard as ArticleCardData } from "@/sanity/types";

const TYPE_LABEL: Record<ArticleCardData["type"], string> = {
  review: "Review",
  comparison: "Comparison",
  "best-of": "Best-of",
};

export function ArticleCard({ article }: { article: ArticleCardData }) {
  const href = `/${article.categorySlug}/${article.slug}`;

  return (
    <article className="group">
      <Link href={href} className="block">
        {article.heroImage?.asset && (
          <div className="mb-4 overflow-hidden border-b border-line">
            <SanityImage
              value={article.heroImage}
              width={640}
              height={420}
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">
          {TYPE_LABEL[article.type]}
          {article.categoryName ? ` · ${article.categoryName}` : ""}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-snug text-ink group-hover:underline">
          {article.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{article.metaDescription}</p>
        <p className="mt-2 font-ui text-xs text-ink-soft">{formatDate(article.publishedAt)}</p>
      </Link>
    </article>
  );
}

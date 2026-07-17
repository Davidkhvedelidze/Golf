import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleCard as ArticleCardData } from "@/sanity/types";

export function RelatedArticles({ articles }: { articles: ArticleCardData[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="font-display text-2xl text-ink">Related articles</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";

type SitemapEntry = {
  _type: "article" | "category";
  slug: string;
  categorySlug?: string;
  updated?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const entries = await client.fetch<SitemapEntry[]>(SITEMAP_QUERY);

    const dynamicRoutes: MetadataRoute.Sitemap = entries
      .map((entry) => {
        const path =
          entry._type === "category" ? `/${entry.slug}` : `/${entry.categorySlug}/${entry.slug}`;
        if (entry._type === "article" && !entry.categorySlug) return null;
        return {
          url: `${SITE_URL}${path}`,
          lastModified: entry.updated ? new Date(entry.updated) : undefined,
          changeFrequency: entry._type === "article" ? ("weekly" as const) : ("monthly" as const),
          priority: entry._type === "article" ? 0.8 : 0.6,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return staticRoutes;
  }
}

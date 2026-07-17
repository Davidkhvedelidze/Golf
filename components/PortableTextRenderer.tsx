import { PortableText, type PortableTextComponents } from "next-sanity";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ProsCons } from "@/components/ProsCons";
import { SanityImage } from "@/components/SanityImage";
import { SpaceRequirements } from "@/components/SpaceRequirements";
import { TrueCostBox } from "@/components/TrueCostBox";
import { VerdictBox } from "@/components/VerdictBox";
import { pickAffiliateLink } from "@/lib/product";
import type { ArticleBodyBlock } from "@/sanity/types";

function getComponents(articleSlug: string): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="my-5 font-body text-[1.125rem] leading-relaxed text-ink">{children}</p>
      ),
      h2: ({ children }) => (
        <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-ink">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 mb-3 font-display text-xl font-semibold text-ink">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-pine pl-5 font-display text-xl italic text-ink">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-5 ml-5 list-disc space-y-1.5 text-[1.05rem] text-ink">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-5 ml-5 list-decimal space-y-1.5 text-[1.05rem] text-ink">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => {
        const href = (value as { href?: string })?.href ?? "#";
        const external = !href.startsWith("/");
        return (
          <a
            href={href}
            className="text-pine underline underline-offset-2"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      comparisonTable: ({ value }) => (
        <ComparisonTable
          title={value.title}
          products={value.products}
          articleSlug={articleSlug}
        />
      ),
      verdictBox: ({ value }) => (
        <VerdictBox
          heading={value.heading}
          product={value.product}
          text={value.text}
          ctaLabel={value.ctaLabel}
          articleSlug={articleSlug}
        />
      ),
      prosCons: ({ value }) => <ProsCons pros={value.pros} cons={value.cons} />,
      affiliateButton: ({ value }) => {
        const link = pickAffiliateLink(value.product, value.retailer);
        if (!link) return null;
        return (
          <div className="my-6">
            <AffiliateButton
              articleSlug={articleSlug}
              product={value.product.name}
              retailer={link.retailer}
              url={link.url}
              label={value.label}
            />
          </div>
        );
      },
      pteImage: ({ value }) => (
        <figure className="my-8">
          <SanityImage value={value.image} width={1000} className="w-full" />
          {value.caption && (
            <figcaption className="mt-2 font-ui text-sm text-ink-soft">{value.caption}</figcaption>
          )}
        </figure>
      ),
      trueCostBox: ({ value }) => <TrueCostBox title={value.title} products={value.products} />,
      spaceRequirements: ({ value }) => (
        <SpaceRequirements title={value.title} products={value.products} />
      ),
    },
  };
}

export function PortableTextRenderer({
  body,
  articleSlug,
}: {
  body: ArticleBodyBlock[];
  articleSlug: string;
}) {
  if (!body || body.length === 0) return null;
  return <PortableText value={body} components={getComponents(articleSlug)} />;
}

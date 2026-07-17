import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SanityImage } from "@/components/SanityImage";
import { buildAboutPageJsonLd, buildPersonJsonLd } from "@/lib/seo";
import { client } from "@/sanity/client";
import { ABOUT_PAGE_QUERY, AUTHOR_QUERY } from "@/sanity/queries";
import type { AboutPageContent, Author } from "@/sanity/types";

const introComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

const inlineComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

async function getAboutPage() {
  return client.fetch<AboutPageContent | null>(
    ABOUT_PAGE_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["aboutPage"] } }
  );
}

async function getAuthor() {
  return client.fetch<Author | null>(
    AUTHOR_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["author"] } }
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  if (!about) return { title: "About" };

  return {
    title: "About",
    description: about.metaDescription,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [about, author] = await Promise.all([getAboutPage(), getAuthor()]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  if (!about) {
    return (
      <div className="mx-auto max-w-[85ch] px-6 py-10 w-full">
        <Breadcrumbs items={breadcrumbs} />
        <p className="mt-6 text-ink-soft">
          This page hasn&apos;t been set up in Sanity yet — add the About Page document in
          Studio.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[85ch] px-6 py-10 w-full">
      <JsonLd data={buildAboutPageJsonLd(about.metaDescription)} />
      {author && <JsonLd data={buildPersonJsonLd(author)} />}

      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-4 border-b border-line pb-8">
        <p className="font-ui text-xs font-semibold uppercase tracking-wide text-pine">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">
          {about.headline}
        </h1>
      </header>

      <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-ink">
        <PortableText value={about.intro} components={introComponents} />
        <p className="border-l-4 border-pine py-1 pl-5 font-display text-2xl italic text-ink">
          {about.pullQuote}
        </p>
      </div>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">What we do</h2>
        {about.whatWeDoIntro && (
          <p className="mt-4 font-body text-lg leading-relaxed text-ink">{about.whatWeDoIntro}</p>
        )}
        <dl className="mt-6 space-y-5 font-body text-lg leading-relaxed">
          {about.whatWeDo.map((item, index) => (
            <div key={index}>
              <dt className="inline font-semibold text-ink">{item.term}</dt>{" "}
              <dd className="inline text-ink-soft">
                <PortableText value={item.description} components={inlineComponents} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Who&apos;s behind this</h2>
        {author ? (
          <div className="mt-6 flex items-start gap-5">
            {author.photo?.asset && (
              <SanityImage
                value={author.photo}
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-display text-xl font-semibold text-ink">{author.name}</p>
              <p className="mt-2 font-body text-lg leading-relaxed text-ink-soft">{author.bio}</p>
              {author.email && (
                <p className="mt-3 font-ui text-sm">
                  <a href={`mailto:${author.email}`} className="text-pine underline">
                    {author.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-6 text-ink-soft">Author bio coming soon.</p>
        )}
      </section>

      <p className="mt-12 border-t border-line pt-8 font-ui text-sm text-ink-soft">
        Some links on this site are affiliate links — see our{" "}
        <Link href="/affiliate-disclosure" className="text-pine underline">
          affiliate disclosure
        </Link>{" "}
        for how that works.
      </p>
    </div>
  );
}

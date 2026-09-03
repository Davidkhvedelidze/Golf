import { defineQuery } from 'next-sanity'
import { articleCardFragment, authorFragment, bodyFragment, imageFragment, productFragment } from './fragments'

export const AUTHOR_QUERY = defineQuery(/* groq */ `
  *[_type == "author"][0]{
    ${authorFragment}
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "aboutPage"][0]{
    metaDescription,
    headline,
    intro,
    pullQuote,
    whatWeDoIntro,
    whatWeDo[]{ term, description }
  }
`)

export const HOME_QUERY = defineQuery(/* groq */ `{
  "featured": *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...6]{
    ${articleCardFragment}
  },
  "categories": *[_type == "category"] | order(name asc){
    _id, name, "slug": slug.current, description
  }
}`)

export const NAV_CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category"] | order(name asc){
    name, "slug": slug.current
  }
`)

export const CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, description
  }
`)

export const ARTICLES_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && category->slug.current == $categorySlug && defined(slug.current)]
  | order(publishedAt desc){
    ${articleCardFragment}
  }
`)

export const ARTICLE_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    metaDescription,
    type,
    "category": category->{ name, "slug": slug.current },
    "author": author->{ ${authorFragment} },
    products[]->{ ${productFragment} },
    "heroImage": coalesce(mainImage, products[0]->image){ ${imageFragment} },
    ${bodyFragment},
    publishedAt,
    updatedAt,
    faq[]{ question, answer }
  }
`)

export const RELATED_ARTICLES_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && category->slug.current == $categorySlug && slug.current != $slug && defined(slug.current)]
  | order(publishedAt desc)[0...3]{
    ${articleCardFragment}
  }
`)

export const ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current) && defined(category->slug.current)]{
    "category": category->slug.current,
    "slug": slug.current
  }
`)

export const CATEGORY_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const SITEMAP_QUERY = defineQuery(/* groq */ `
  *[_type in ["article", "category"] && defined(slug.current)]{
    _type,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "updated": coalesce(updatedAt, _updatedAt)
  }
`)

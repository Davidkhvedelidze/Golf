export const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
`

export const productFragment = /* groq */ `
  _id,
  name,
  brand,
  "slug": slug.current,
  image { ${imageFragment} },
  priceUSD,
  priceNote,
  specs[]{ label, value },
  affiliateLinks[]{ retailer, url },
  rating,
  pros,
  cons,
  bestFor,
  subscription,
  space
`

export const authorFragment = /* groq */ `
  name,
  bio,
  email,
  linkedinUrl,
  photo { ${imageFragment} }
`

export const bodyFragment = /* groq */ `
  body[]{
    ...,
    _type == "comparisonTable" => {
      ...,
      products[]->{ ${productFragment} }
    },
    _type == "verdictBox" => {
      ...,
      product->{ ${productFragment} }
    },
    _type == "affiliateButton" => {
      ...,
      product->{ ${productFragment} }
    },
    _type == "pteImage" => {
      ...,
      image { ${imageFragment} }
    },
    _type == "trueCostBox" => {
      ...,
      products[]->{ ${productFragment} }
    },
    _type == "spaceRequirements" => {
      ...,
      products[]->{ ${productFragment} }
    }
  }
`

export const articleCardFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  type,
  metaDescription,
  publishedAt,
  updatedAt,
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "heroImage": products[0]->image{ ${imageFragment} }
`

import { PackageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'brand', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: (doc) => `${doc.brand ?? ''} ${doc.name ?? ''}`, maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().warning('Alt text is important for SEO'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceUSD',
      title: 'Price (USD)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceNote',
      title: 'Price note',
      description: 'e.g. "as of Jul 2026"',
      type: 'string',
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'array',
      of: [defineArrayMember({ type: 'specItem' })],
    }),
    defineField({
      name: 'affiliateLinks',
      title: 'Affiliate links',
      type: 'array',
      of: [defineArrayMember({ type: 'affiliateLinkItem' })],
      validation: (rule) => rule.min(1).error('Add at least one affiliate link'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (out of 10)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(10).precision(1),
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'bestFor',
      title: 'Best for',
      description: 'e.g. "beginners with swing speed under 90mph"',
      type: 'string',
    }),
    defineField({
      name: 'subscription',
      title: 'Subscription',
      type: 'subscriptionInfo',
    }),
    defineField({
      name: 'space',
      title: 'Space requirements',
      type: 'spaceInfo',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'brand', media: 'image' },
  },
})

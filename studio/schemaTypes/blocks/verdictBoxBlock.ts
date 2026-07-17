import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const verdictBoxBlock = defineType({
  name: 'verdictBox',
  title: 'Verdict Box',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our pick',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Verdict text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label (optional override)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'product.name' },
  },
})

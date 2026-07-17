import { SplitHorizontalIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const comparisonTableBlock = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  icon: SplitHorizontalIcon,
  fields: [
    defineField({ name: 'title', title: 'Title (optional)', type: 'string' }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
      validation: (rule) => rule.min(2).error('Add at least two products to compare'),
    }),
  ],
  preview: {
    select: { title: 'title', count: 'products.length' },
    prepare({ title, count }) {
      return { title: title || 'Comparison Table', subtitle: `${count || 0} products` }
    },
  },
})

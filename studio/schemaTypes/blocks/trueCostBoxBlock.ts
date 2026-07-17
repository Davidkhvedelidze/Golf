import { CaseIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const trueCostBoxBlock = defineType({
  name: 'trueCostBox',
  title: 'True Cost Box',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'title', title: 'Title (optional)', type: 'string' }),
    defineField({
      name: 'products',
      title: 'Products',
      description: 'One product for a single breakdown, 2–3 for a side-by-side comparison',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
      validation: (rule) => rule.min(1).max(3),
    }),
  ],
  preview: {
    select: { title: 'title', count: 'products.length' },
    prepare({ title, count }) {
      return { title: title || 'True Cost Box', subtitle: `${count || 0} product(s)` }
    },
  },
})

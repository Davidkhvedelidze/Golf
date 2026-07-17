import { ExpandIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const spaceRequirementsBlock = defineType({
  name: 'spaceRequirements',
  title: 'Space Requirements',
  type: 'object',
  icon: ExpandIcon,
  fields: [
    defineField({ name: 'title', title: 'Title (optional)', type: 'string' }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', count: 'products.length' },
    prepare({ title, count }) {
      return { title: title || 'Space Requirements', subtitle: `${count || 0} product(s)` }
    },
  },
})

import { defineArrayMember, defineField, defineType } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'

export const prosConsBlock = defineType({
  name: 'prosCons',
  title: 'Pros / Cons',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { pros: 'pros.length', cons: 'cons.length' },
    prepare({ pros, cons }) {
      return { title: 'Pros / Cons', subtitle: `${pros || 0} pros, ${cons || 0} cons` }
    },
  },
})

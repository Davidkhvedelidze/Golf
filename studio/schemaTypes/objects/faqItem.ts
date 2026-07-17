import { HelpCircleIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'question', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', type: 'text', rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'question' },
  },
})

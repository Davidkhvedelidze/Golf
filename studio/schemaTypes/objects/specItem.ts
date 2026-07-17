import { defineField, defineType } from 'sanity'

export const specItem = defineType({
  name: 'specItem',
  title: 'Spec',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'value', type: 'string', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})

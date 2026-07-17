import { defineArrayMember, defineField, defineType } from 'sanity'

export const whatWeDoItem = defineType({
  name: 'whatWeDoItem',
  title: 'What We Do Item',
  type: 'object',
  fields: [
    defineField({
      name: 'term',
      title: 'Lead-in phrase',
      description: 'Bold phrase the item opens with, e.g. "True cost analysis."',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'term' },
  },
})

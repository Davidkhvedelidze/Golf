import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'bio', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', validation: (rule) => rule.required() })],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
})

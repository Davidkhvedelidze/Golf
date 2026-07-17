import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const pteImageBlock = defineType({
  name: 'pteImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Image', media }
    },
  },
})

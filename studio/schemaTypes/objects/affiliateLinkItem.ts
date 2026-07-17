import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const affiliateLinkItem = defineType({
  name: 'affiliateLinkItem',
  title: 'Affiliate Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'retailer',
      title: 'Retailer',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'retailer', subtitle: 'url' },
  },
})

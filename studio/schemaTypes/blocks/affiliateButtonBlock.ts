import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const affiliateButtonBlock = defineType({
  name: 'affiliateButton',
  title: 'Affiliate Button',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'retailer',
      title: 'Retailer (optional)',
      description: 'Match a retailer name from the product’s affiliate links. Leave blank to use the first link.',
      type: 'string',
    }),
    defineField({
      name: 'label',
      title: 'Button label override (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'product.name', subtitle: 'retailer' },
    prepare({ title, subtitle }) {
      return { title: title ? `Check price: ${title}` : 'Affiliate Button', subtitle }
    },
  },
})

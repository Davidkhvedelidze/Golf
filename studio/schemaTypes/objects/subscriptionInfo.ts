import { defineField, defineType } from 'sanity'

export const subscriptionInfo = defineType({
  name: 'subscriptionInfo',
  title: 'Subscription',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'e.g. "Rapsodo Premium (needed for full sim features)"',
      type: 'string',
    }),
    defineField({
      name: 'pricePerYear',
      title: 'Price per year (USD)',
      type: 'number',
    }),
    defineField({
      name: 'required',
      title: 'Required for full features',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'trialDays',
      title: 'Trial days',
      description: '0 if no trial',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'pricePerYear' },
    prepare({ title, subtitle }) {
      return { title: title || 'Subscription', subtitle: subtitle ? `$${subtitle}/yr` : undefined }
    },
  },
})

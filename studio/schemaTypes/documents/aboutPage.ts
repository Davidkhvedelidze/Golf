import { InfoOutlineIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  // Singleton: one fixed document (_id: "aboutPage"), pinned in the desk structure.
  fields: [
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'The big H1 statement at the top of the page',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'Opening paragraph(s), before the pull quote',
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
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      description: 'Short standalone statement, styled prominently',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatWeDoIntro',
      title: '"What we do" intro line',
      type: 'string',
    }),
    defineField({
      name: 'whatWeDo',
      title: 'What we do',
      type: 'array',
      of: [defineArrayMember({ type: 'whatWeDoItem' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})

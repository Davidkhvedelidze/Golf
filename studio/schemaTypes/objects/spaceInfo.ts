import { defineField, defineType } from 'sanity'

export const spaceInfo = defineType({
  name: 'spaceInfo',
  title: 'Space requirements',
  type: 'object',
  fields: [
    defineField({
      name: 'roomDepthFt',
      title: 'Room depth (ft)',
      description: '0 means no depth requirement (e.g. side-placed units)',
      type: 'number',
    }),
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Behind ball', value: 'behind ball' },
          { title: 'Side', value: 'side' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'placementDetail',
      title: 'Placement detail',
      description: 'Human-readable, e.g. "55 in (4.6 ft) behind the ball"',
      type: 'string',
    }),
    defineField({
      name: 'indoorOk',
      title: 'Works indoors',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'outdoorOk',
      title: 'Works outdoors',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'placementDetail', subtitle: 'roomDepthFt' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Space requirements',
        subtitle: subtitle !== undefined ? `${subtitle} ft depth` : undefined,
      }
    },
  },
})

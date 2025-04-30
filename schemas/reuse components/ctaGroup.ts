import {defineType} from 'sanity'

export default defineType({
  name: 'ctaGroup',
  title: 'CTA Group',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'ctaArray',
      title: 'Cta Array',
      type: 'array',
      of: [{type: 'localLink'}],
    },
  ],
})

import {defineType} from 'sanity'
import {commonPreviewConfig} from '../previewConfig'

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    {
      name: 'lang',
      title: 'Language',
      type: 'language',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'links',
      title: 'links',
      type: 'array',
      of: [
        {type: 'localLink'}, // Handles single CTA references
        {type: 'ctaGroup'}, // ✅ Now uses the named schema
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: commonPreviewConfig('Navbar'),
})

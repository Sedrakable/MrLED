import {defineType} from 'sanity'

export default defineType({
  name: 'customImage',
  title: 'Custom Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for the image (required for accessibility)',
      validation: (Rule) => Rule.required(),
    },
    // Add more fields as needed
  ],
  validation: (Rule) => Rule.required(),
})

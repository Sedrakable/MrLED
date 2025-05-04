import {defineType} from 'sanity'

export default defineType({
  name: 'fancyText',
  title: 'Fancy Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'}, // ✅ Bold text becomes cursive
        ],
      },
    },
  ],
})

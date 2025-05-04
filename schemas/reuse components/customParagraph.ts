import {defineType} from 'sanity'

export default defineType({
  name: 'customParagraph',
  title: 'Custom Paragraph',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'}, // ✅ Enables bullet points
        {title: 'Numbered', value: 'number'}, // ✅ Enables numbered lists
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'}, // Keep bold
          {title: 'Italic', value: 'em'}, // Keep italic
          {title: 'Underline', value: 'underline'}, // Add underline
          // Add other decorators as needed, excluding "strike-through"
        ],
      },
    },
  ],
})

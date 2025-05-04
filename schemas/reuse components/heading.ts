import {defineType} from 'sanity'

export default defineType({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  fields: [
    {
      name: 'children',
      title: 'Children (Text)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Level 1', value: '1'},
          {title: 'Level 2', value: '2'},
          {title: 'Level 3', value: '3'},
          {title: 'Level 4', value: '4'},
          {title: 'Level 5', value: '5'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'weight',
      title: 'Weight',
      type: 'string',
      options: {
        list: [
          {title: '400 - Regular', value: '400'},
          {title: '500 - Medium', value: '500'},
          {title: '600 - Semi-Bold', value: '600'},
          {title: '700 - Bold', value: '700'},
          {title: '800 - Extra-Bold', value: '800'},
          {title: '900 - Black', value: '900'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'font',
      title: 'Font',
      type: 'string',
      options: {
        list: [
          {title: 'Sans Serif (Outfit)', value: 'Outfit'},
          {title: 'Cursive (Finger Paint)', value: 'Cursive'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
  ],
})

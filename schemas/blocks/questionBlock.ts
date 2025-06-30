import { defineType } from "sanity";

export default defineType({
  name: "questionBlock",
  title: "Question Block",
  type: "document",
  fields: [
    {
      name: "hiddenTitle",
      title: "Hidden Title",
      type: "string",
    },
    {
      name: "title1",
      title: "Title 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title2",
      title: "Title 2",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "questions",
      title: "Questions",
      type: "array",
      of: [{ type: "reference", to: { type: "question" } }],
      validation: (Rule) => Rule.optional(),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

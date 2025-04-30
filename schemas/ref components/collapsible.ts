import { defineType } from "sanity";

export default defineType({
  name: "collapsible",
  title: "Collapsible FAQ",
  type: "document",
  fields: [
    {
      name: "hiddenTitle",
      title: "Hidden Title",
      type: "string",
    },
    {
      name: "id",
      title: "ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lang",
      title: "Language",
      type: "language",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title for the collapsible section",
    },
    {
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "customParagraph",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).warning("At least one question is required."),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

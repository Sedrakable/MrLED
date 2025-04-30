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

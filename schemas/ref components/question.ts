import { defineType } from "sanity";

export default defineType({
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "desc",
      title: "Description",
      type: "customParagraph",
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title", // Default to image preview
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
});

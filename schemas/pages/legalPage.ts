import { defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
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
      name: "path",
      title: "Path",
      type: "localPath",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "data",
      title: "Data",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

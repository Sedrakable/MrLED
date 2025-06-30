import { defineType } from "sanity";

export default defineType({
  name: "featureBlock",
  title: "Feature Block",
  type: "document",
  fields: [
    {
      name: "hiddenTitle",
      title: "Hidden Title",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "reference", to: { type: "feature" } }],
      validation: (Rule) => Rule.optional(),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

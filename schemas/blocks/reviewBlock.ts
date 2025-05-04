import { defineType } from "sanity";

export default defineType({
  name: "reviewBlock",
  title: "Review Block",
  type: "document",
  fields: [
    {
      name: "hiddenTitle",
      title: "Hidden Title",
      type: "string",
    },
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "reference", to: { type: "review" } }],
      validation: (Rule) => Rule.optional(),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

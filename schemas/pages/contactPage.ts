import { defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    {
      name: "hiddenTitle",
      title: "Hidden Title",
      type: "string",
    },
    {
      name: "meta",
      title: "Meta",
      type: "seo",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lang",
      title: "Language",
      type: "language",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hero",
      title: "Hero",
      type: "hero",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "collapsibles",
      title: "Collapsibles FAQ",
      type: "array",
      of: [{ type: "reference", to: { type: "collapsible" } }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

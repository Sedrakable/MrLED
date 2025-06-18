import { defineType } from "sanity";

export default defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
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
      name: "portfolioHero",
      title: "Portfolio Hero",
      type: "portfolioHero",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "workBlock",
      title: "Work Block",
      type: "reference",
      to: { type: "workBlock" },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

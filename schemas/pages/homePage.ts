import { defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
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
      name: "questionBlock",
      title: "questionBlock",
      type: "reference",
      to: { type: "questionBlock" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "featureBlock",
      title: "FeatureBlock",
      type: "reference",
      to: { type: "featureBlock" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "reviewBlock",
      title: "reviewBlock",
      type: "reference",
      to: { type: "reviewBlock" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "collapsible",
      title: "Collapsible FAQ",
      type: "reference",
      to: { type: "collapsible" },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "hiddenTitle",
    },
  },
});

import { defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaDesc",
      title: "Meta Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
  validation: (Rule) => Rule.required(),
});

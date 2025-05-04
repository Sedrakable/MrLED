import { defineType } from "sanity";

export default defineType({
  name: "socials",
  title: "Socials",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "links",
      title: "Social Links",
      type: "array",
      of: [{ type: "cta" }],
      validation: (Rule) => Rule.required(),
    },
  ],
});

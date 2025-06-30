import { defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "path",
      title: "Link",
      type: "string",
    },
  ],
});

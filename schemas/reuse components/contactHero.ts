import { defineType } from "sanity";

export default defineType({
  name: "contactHero",
  title: "Contact Hero",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subTitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "contactInfos",
      title: "Contact Infos",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
});

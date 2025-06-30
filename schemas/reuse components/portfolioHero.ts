import { defineType } from "sanity";

export default defineType({
  name: "portfolioHero",
  title: "Portfolio Hero",
  type: "document",
  fields: [
    {
      name: "profileImage",
      title: "Profile Image",
      type: "customImage",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "desc",
      title: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
});

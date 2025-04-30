import { defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    // {
    //   name: "backgroundImage",
    //   title: "Background Image",
    //   type: "customImage",
    //   validation: (Rule) => Rule.required(),
    // },
    // {
    //   name: "foregroundImage",
    //   title: "Foreground Image",
    //   type: "customImage",
    //   validation: (Rule) => Rule.required(),
    // },
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
      name: "desc",
      title: "Description",
      type: "customParagraph",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cta1",
      title: "Call to Action",
      type: "cta",
    },
  ],
});

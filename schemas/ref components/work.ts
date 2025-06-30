import { defineType } from "sanity";

export default defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "meta",
      title: "Meta",
      type: "seo",
      validation: (Rule) =>
        Rule.custom((meta, context) => {
          const workType = context.document?.workType;
          if (workType === "wood" && !meta) {
            return "Meta is required for Wood Signs";
          }
          return true;
        }),
    },
    // {
    //   name: "title",
    //   title: "Title",
    //   type: "string",
    //   validation: (Rule) => Rule.required(),
    //   // Optional, no validation
    // },
    {
      name: "descEN",
      title: "Description English",
      type: "text",
      // Optional, no validation
    },
    {
      name: "descFR",
      title: "Description French",
      type: "text",
      // Optional, no validation
    },
    {
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "customImage",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [{ type: "customImage" }],
      description: "Images for modal display (e.g., Wood Signs). Optional.",
      validation: (Rule) => Rule.max(30), // Optional, max 30
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
  ],
  preview: {
    select: {
      title: "descFR",
      media: "thumbnailImage",
    },
  },
});

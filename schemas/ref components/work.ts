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
      validation: (Rule) => Rule.optional(),
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
    //   name: "workType",
    //   title: "Work Type",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Wood Signs", value: "wood" },
    //       { title: "Branding", value: "branding" },
    //       { title: "Website", value: "website" },
    //       { title: "Playing Cards", value: "cards" },
    //       { title: "Gallery", value: "gallery" },
    //     ],
    //   },
    //   validation: (Rule) => Rule.required(),
    // },
    {
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "customImage",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      // Optional, no validation
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
      name: "link",
      title: "External Link",
      type: "url",
      description: "External URL (e.g., Behance, Kickstarter). Optional.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }), // Optional, but must be valid URL if provided
    },
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
  ],
  preview: {
    select: {
      title: "title",
      workType: "workType",
      media: "thumbnailImage",
    },
    prepare({ title, workType, media }) {
      return {
        title: title || "Untitled Work",
        subtitle: workType,
        media,
      };
    },
  },
});

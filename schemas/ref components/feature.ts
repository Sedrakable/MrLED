import { defineType } from "sanity";

export default defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    {
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Custom Image", value: "image" },
          { title: "SVG Name", value: "svg" },
        ],
        layout: "radio", // User selects one option
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "customImage",
      title: "Custom Image",
      type: "customImage",
      hidden: ({ parent }) => parent?.mediaType !== "image", // Show only if 'image' is selected
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent == "image" && !value) {
            return "An image is required when 'Custom Image' is selected.";
          }
          return true;
        }),
    },
    {
      name: "svgName",
      title: "SVG Name",
      type: "string",
      description: "Enter the exact name of the SVG (e.g., 'LogoSmall')",
      hidden: ({ parent }) => parent?.mediaType !== "svg", // Show only if 'svg' is selected
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent === "svg" && !value) {
            return "An SVG name is required when 'SVG Name' is selected.";
          }
          return true;
        }),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "desc",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
});

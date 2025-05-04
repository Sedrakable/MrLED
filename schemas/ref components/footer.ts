import { defineType } from "sanity";
import { commonPreviewConfig } from "../previewConfig";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "lang",
      title: "Language",
      type: "language",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "trademark",
      title: "Trademark",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "legals",
      title: "legals",
      type: "array",
      of: [{ type: "reference", to: { type: "legalPage" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "socials",
      title: "Socials",
      type: "reference",
      to: { type: "socials" },
    },
  ],
  preview: commonPreviewConfig("Footer"),
});

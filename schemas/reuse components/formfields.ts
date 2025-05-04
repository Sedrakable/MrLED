import { defineType } from "sanity";
import { commonPreviewConfig } from "../previewConfig";

export default defineType({
  name: "fieldPlaceholders",
  title: "Field Placeholders",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "budget",
      title: "Budget",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "message",
      title: "Message",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: commonPreviewConfig("Field Placeholders"),
});

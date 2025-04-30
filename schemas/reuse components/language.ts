import { defineType } from "sanity";

export default defineType({
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: [
      { title: "English", value: "en" },
      { title: "French", value: "fr" },
    ],
    layout: "dropdown", // Optional: Use dropdown for selecting language
  },
  validation: (Rule) =>
    Rule.required().custom((value: unknown) => {
      if (typeof value !== "string" || !["en", "fr"].includes(value)) {
        return 'Language must be either "en" or "fr"';
      }
      return true;
    }),
});

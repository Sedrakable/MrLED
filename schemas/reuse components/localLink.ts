import { defineType } from "sanity";

export default defineType({
  name: "localLink",
  title: "Local Link",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Link",
      type: "localPath",
    },
    {
      name: "target",
      title: "Target",
      type: "localTarget",
    },
  ],
});

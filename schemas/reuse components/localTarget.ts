import { defineType } from "sanity";

export default defineType({
  name: "localTarget",
  title: "Local Target",
  type: "string",
  options: {
    list: ["#branding-faq", "#web-faq", "#wood-faq"],
  },
});

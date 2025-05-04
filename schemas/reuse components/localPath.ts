import { defineType } from "sanity";

export default defineType({
  name: "localPath",
  title: "Local Path",
  type: "string",
  options: {
    list: [
      "/",
      // "/custom-work",
      // "/about-work",
      // "/contact",
      "/terms-and-conditions",
      "/privacy-policy",
    ],
  },
});

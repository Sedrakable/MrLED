import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/fr", // Allow crawling only for the French version
      disallow: [], // No additional disallow rules unless needed
    },
    sitemap: `${
      process.env.BASE_NAME || "https://adhennatattoo.com"
    }/sitemap.xml`,
  };
}

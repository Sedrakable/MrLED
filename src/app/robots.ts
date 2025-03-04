import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [], // No additional disallow rules unless needed
      allow: "/fr", // Allow crawling only for the French version
    },
    sitemap: `${
      process.env.BASE_NAME || "https://adhennatattoo.com"
    }/sitemap.xml`,
  };
}

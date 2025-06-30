import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/en/legal/", "/fr/legal/"],
    },
    sitemap: `${process.env.BASE_NAME || "http://www.mrled.ca"}/sitemap.xml`,
  };
}

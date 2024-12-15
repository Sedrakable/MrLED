import { MetadataRoute } from "next";

interface SiteMapEntry {
  url: string;
  lastModified: string;
  changefreq?: string;
  priority?: number;
  images?: { loc: string; title?: string; caption?: string }[];
}

// Static URLs to include
const baseUrls = [
  "/",
  "/blog",
  "/contact",
  "/cart",
  "/legal/policies",
  "/boutique",
];

// Specific subpaths for `/course/*` and `/service/*`
const courseUrls = ["/course/in-person", "/course/online"];
const serviceUrls = [
  "/service/tattoo",
  "/service/henna",
  "/service/test-tattoo",
];

// Combine all static and subpath URLs into a single flat array
const allUrls = [...baseUrls, ...courseUrls, ...serviceUrls];

// Dynamic routes for portfolio
const dynamicRouteProjects = ["tattoo", "henna", "flash", "toiles"];

// Generate static entries
const generateStaticEntry = (baseUrl: string): SiteMapEntry => {
  const url = `https://adhennatattoo.com/fr${baseUrl}`;
  return {
    url,
    lastModified: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
    images: baseUrl === "/boutique" ? generateImageEntries(baseUrl) : undefined,
  };
};

// Generate dynamic entries for portfolio routes
const generateDynamicEntries = dynamicRouteProjects.map((projectType) => {
  const url = `https://adhennatattoo.com/fr/portfolio/${projectType}`;
  return {
    url,
    lastModified: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.6,
    images: generateImageEntries(`/portfolio/${projectType}`),
  };
});

// Example image generation function (customize as needed)
const generateImageEntries = (
  basePath: string
): { loc: string; title?: string; caption?: string }[] => {
  const imageBasePath = `https://adhennatattoo.com/images${basePath}`;
  return [
    {
      loc: `${imageBasePath}/image1.jpg`,
      title: "Example Image 1",
      caption: "Caption for Image 1",
    },
    {
      loc: `${imageBasePath}/image2.jpg`,
      title: "Example Image 2",
      caption: "Caption for Image 2",
    },
  ];
};

// Combine static and dynamic entries
const siteMapEntries = [
  ...allUrls.map(generateStaticEntry),
  ...generateDynamicEntries,
];

// Adapt the output to match the Next.js expected structure
export default function sitemap(): MetadataRoute.Sitemap {
  return siteMapEntries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    // Optional fields added only if they exist
    ...("changefreq" in entry && { changefreq: entry.changefreq }),
    ...("priority" in entry && { priority: entry.priority }),
  }));
}

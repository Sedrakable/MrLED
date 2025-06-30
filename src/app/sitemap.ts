import { MetadataRoute } from "next";
import { sitemapWorkQuery } from "./api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { ISlug, LocalPaths } from "@/data.d";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { SanityDocument } from "@sanity/client";
import { urlFor } from "./api/client";

const BASE_URL = process.env.BASE_NAME || "http://www.mrled.ca";

const staticUrls: Record<string, string[]> = {
  base: [LocalPaths.HOME, LocalPaths.PORTFOLIO, LocalPaths.CONTACT],
};
const allUrls: string[] = Object.values(staticUrls).flat();

const priorityMap: Record<string, number> = {
  [LocalPaths.HOME]: 1,
  [LocalPaths.PORTFOLIO]: 0.9,
  [LocalPaths.CONTACT]: 0.9,
};

const changeFrequencyMap: Record<
  string,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  [LocalPaths.HOME]: "monthly",
  [LocalPaths.PORTFOLIO]: "weekly",
  [LocalPaths.CONTACT]: "monthly",
};

const generateStaticEntries: MetadataRoute.Sitemap = allUrls.map((baseUrl) => {
  const enUrl = `${BASE_URL}/en${baseUrl}`;
  const frUrl = `${BASE_URL}/fr${baseUrl}`;

  return {
    url: frUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: changeFrequencyMap[baseUrl] || "monthly",
    priority: priorityMap[baseUrl] || 0.9,
    alternates: {
      languages: {
        en: enUrl,
        fr: frUrl,
      },
    },
  };
});

export interface SitemapWorkQueryType extends SanityDocument {
  slug: ISlug; // Optional for internal links // From Sanity// External URL (e.g., Behance, Kickstarter)
  images: ICustomImage[]; // For modal slider (Wood Signs)
}

async function getWorkData() {
  try {
    const query = sitemapWorkQuery;
    const data: SitemapWorkQueryType[] = await fetchPage(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch work data:", error);
    return [];
  }
}

//NED english and French
const generateDynamicEntries = async (): Promise<MetadataRoute.Sitemap> => {
  const workData: SitemapWorkQueryType[] = await getWorkData();

  const productEntries: MetadataRoute.Sitemap = workData.map(
    (work: SitemapWorkQueryType) => {
      const enUrl = `${BASE_URL}/en${LocalPaths.PORTFOLIO}${work.slug.current}`;
      const frUrl = `${BASE_URL}/fr${LocalPaths.PORTFOLIO}${work.slug.current}`;
      return {
        url: frUrl,
        lastModified:
          work._updatedAt && !isNaN(new Date(work._updatedAt).getTime())
            ? new Date(work._updatedAt).toISOString()
            : new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
        images:
          work.images
            ?.filter((image) => image.image) // Ensure image exists
            .map((image) => urlFor(image.image).url()) || [],
        alternates: {
          languages: {
            en: enUrl,
            fr: frUrl,
          },
        },
      };
    }
  );

  return productEntries;
};

// Adapt the output to match the Next.js expected structure
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicEntries = await generateDynamicEntries();
  return [...generateStaticEntries, ...dynamicEntries];
}

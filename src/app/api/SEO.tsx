import { Metadata } from "next";
import { LangType } from "@/i18n/request";
import { ISeo } from "@/data.d";

interface SEOProps extends ISeo {
  locale: LangType;
  path: string;
  crawl?: boolean;
}

export const setMetadata = ({
  locale,
  metaTitle,
  metaDesc,
  metaImage = "https://i.imgur.com/u9EH6vH.png",
  path,
  crawl = true,
}: SEOProps): Metadata => {
  const baseUrl = process.env.BASE_NAME;
  const canonicalUrl = `${baseUrl}/${locale}${path}`;
  return {
    title: metaTitle || "MR LED",
    description: metaDesc || "Explore work by MR LED.",
    robots: { index: crawl, follow: crawl },
    openGraph: {
      url: canonicalUrl,
      type: "website",
      title: metaTitle || "MR LED",
      description: metaDesc || "Explore work by MR LED.",
      locale,
      images: [{ url: metaImage, width: 1200, height: 630, alt: "MR LED" }],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://www.mrled.com/en${path}`,
        fr: `https://www.mrled.com/fr${path}`,
      },
    },
  };
};

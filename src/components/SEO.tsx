import { Metadata } from "next";
import { LangType } from "@/i18n/request";
import dynamic from "next/dynamic";
import { ISeo } from "@/data.d";

interface SEOProps extends ISeo {
  locale: LangType;
  path: string;
  crawl?: boolean;
}
// Dynamic import for the BreadcrumbJsonLd component
const DynamicBreadcrumbJsonLd = dynamic(() =>
  import("next-seo").then((mod) => mod.BreadcrumbJsonLd)
);
export const setMetadata = ({
  locale,
  metaTitle,
  metaDesc,
  metaKeywords,
  path,
  crawl,
}: SEOProps): Metadata => {
  const metadata: Metadata = {
    title: metaTitle,
    description: metaDesc,
    keywords: metaKeywords,
    robots: {
      index: crawl,
      follow: crawl,
    },
    openGraph: {
      url: `https://www.adhennatattoo.com/${locale}${path}`,
      type: "website",
      title: metaTitle,
      description: metaDesc,
      locale: locale,
      siteName: "ADHENNA TATTOO",
      images: [
        {
          url: "https://i.imgur.com/XsJPXnO.jpeg",
          width: 1050,
          height: 600,
          alt: "Adhenna Tattoo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      site: "@AdhennaTattoo",
      images: [
        {
          url: "https://i.imgur.com/XsJPXnO.jpeg",
          width: 1200,
          height: 630,
          alt: "Adhenna Tattoo",
        },
      ],
    },
    alternates: {
      canonical: `https://www.adhennatatoo.com/${locale}${path}`,
      languages: {
        en: `https://www.adhennatatoo.com/en${path}`,
        fr: `https://www.adhennatatoo.com/fr${path}`,
      },
    },
  };

  return metadata;
};

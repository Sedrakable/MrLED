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
      site: "@SetoXArts",
      images: [
        {
          url: "https://i.imgur.com/u9EH6vH.png",
          width: 1200,
          height: 630,
          alt: "Seto X Arts",
        },
      ],
    },
    alternates: {
      canonical: `https://www.setoxarts.com/${locale}${path}`,
      languages: {
        en: `https://www.setoxarts.com/en${path}`,
        fr: `https://www.setoxarts.com/fr${path}`,
      },
    },
  };

  return metadata;
};

// export const JsonLD = () => (
//   <DynamicBreadcrumbJsonLd
//     itemListElements={[
//       {
//         position: 1,
//         name: "Home",
//         item: "https://setoxarts.com",
//       },
//       {
//         position: 2,
//         name: "Branding",
//         item: "https://setoxarts.com/en/service/branding",
//       },
//       {
//         position: 3,
//         name: "Web Design",
//         item: "https://setoxarts.com/en/service/web-design",
//       },
//       {
//         position: 4,
//         name: "Contact",
//         item: "https://setoxarts.com/en/contact",
//       },
//     ]}
//   />
// );

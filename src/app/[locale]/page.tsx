import {
  ISeo,
  IHero,
  ICollapsible,
  LocalPaths,
  LocalTargets,
  IReviewBlock,
  IFeatureBlock,
  IQuestionBlock,
} from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";

import { homePageQuery } from "../api/generateSanityQueries";
import { getCarouselImages } from "@/components/reuse/Carousel/getCarouselData";
import { Carousel } from "@/components/reuse/Carousel/Carousel";
import { Questions } from "@/components/services/Questions/Questions";
import { Features } from "@/components/services/Features/Features";
import { Reviews } from "@/components/pages/Reviews/Reviews";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { ImageAndForm } from "@/components/pages/ContactPage/ImageAndForm/ImageAndForm";
import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { Hero } from "@/components/reuse/Hero/Hero";
import { getTranslations } from "@/helpers/langUtils";
import { Metadata } from "next";
import { setMetadata } from "@/app/api/SEO";

export interface HomePageProps {
  meta: ISeo;
  hero: IHero;
  questionBlock: IQuestionBlock;
  featureBlock: IFeatureBlock;
  reviewBlock: IReviewBlock;
  collapsible: ICollapsible;
}

const getHomePageData = async (locale: LangType) => {
  try {
    const homeQuery = homePageQuery(locale);
    const data: HomePageProps = await fetchPage(homeQuery);

    return data;
  } catch (error) {
    console.error("Failed to fetch landing page data:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "";
  const crawl = true;
  const homePageData = await getHomePageData(locale);

  // Add fallback values in case landingPageData is null
  const metaTitle = homePageData?.meta?.metaTitle || "MR LED";
  const metaDesc = homePageData?.meta?.metaDesc || "MR LED";

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);Para
  const { locale } = await params;

  // Fetch data in parallel instead of sequential
  const [data, carouselImages, formData, translations] = await Promise.all([
    getHomePageData(locale),
    getCarouselImages(),
    getFormData("contact", locale),
    Promise.resolve(getTranslations(locale)), // Make sync function async-compatible
  ]);

  return (
    data && (
      <>
        {data.hero && (
          <Hero
            {...data.hero}
            cta1={{
              text: translations.buttons.contact,
              path: `/${locale}${LocalPaths.HOME}`,
              scrollTarget: LocalTargets.CONTACTFORM,
            }}
          />
        )}
        <Carousel
          images={carouselImages}
          cta={{
            text: translations.buttons.viewPortfolio,
            path: `/${locale}${LocalPaths.PORTFOLIO}`,
          }}
        />
        {data.questionBlock && <Questions {...data.questionBlock} />}
        {data.featureBlock && <Features {...data.featureBlock} />}
        {data.reviewBlock && <Reviews {...data.reviewBlock} />}
        {<ImageAndForm {...formData} />}
        {data.collapsible && <Collapsible {...data.collapsible} />}
      </>
    )
  );
}

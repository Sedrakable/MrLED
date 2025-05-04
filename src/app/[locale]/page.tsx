import {
  ISeo,
  IHero,
  IQuestion,
  IFeature,
  IReview,
  ICollapsible,
  LocalPaths,
  LocalTargets,
} from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";

import { homePageQuery } from "../api/generateSanityQueries";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { getCarouselImages } from "@/components/reuse/Carousel/getCarouselData";
import { Carousel } from "@/components/reuse/Carousel/Carousel";
import { Questions } from "@/components/services/Questions/Questions";
import { Features } from "@/components/services/Features/Features";
import { Reviews } from "@/components/pages/Reviews/Reviews";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { ImageAndForm } from "@/components/pages/ContactPage/ImageAndForm/ImageAndForm";
import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { Hero } from "@/components/reuse/Hero/Hero";
import { getTranslations } from "@/helpers/langUtils";

export interface HomePageProps {
  meta: ISeo;
  hero: IHero;
  questionBlock: { questions: IQuestion[] };
  featureBlock: { features: IFeature[] };
  reviewBlock: { reviews: IReview[] };
  collapsible: ICollapsible;
}

const getHomePageData = async (locale: LangType) => {
  const homeQuery = homePageQuery(locale);
  const data: HomePageProps = await fetchPage(homeQuery);

  return data;
};

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: LangType };
// }): Promise<Metadata> {
//   const path = `${LocalPaths.WOOD}`;
//   const crawl = true;
//   const data: HomePageProps = await getHomePageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = data.meta;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);Para
  const { locale } = await params;
  const translations = getTranslations(locale);
  const data = await getHomePageData(locale);
  const carouselImages: ICustomImage[] = await getCarouselImages();
  const formData: FormTitleProps = await getFormData("contact", locale);

  return (
    data && (
      <>
        {data.hero && (
          <Hero
            {...data.hero}
            cta1={{
              text: translations.buttons.contact,
              path: `/${locale}${LocalPaths.HOME}`,
              scrollTarget: LocalTargets.HOMEFORM,
            }}
          />
        )}
        {carouselImages && <Carousel images={carouselImages} />}
        {data.questionBlock && (
          <Questions
            questions={data.questionBlock.questions}
            title1="Arrête de rester dans l’ombre"
            title2="Commence à illuminer la place"
          />
        )}
        {data.featureBlock && (
          <Features
            features={data.featureBlock.features}
            title="Ce que tu obtiens"
          />
        )}
        {data.reviewBlock && <Reviews reviews={data.reviewBlock.reviews} />}
        {<ImageAndForm {...formData} />}
        {data.collapsible && <Collapsible {...data.collapsible} />}
      </>
    )
  );
}

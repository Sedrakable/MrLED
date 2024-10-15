// Next.js and React imports
import { Metadata } from "next";
import dynamic from "next/dynamic";

// API and data fetching
import { hennaServicePageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { getCarouselData } from "@/components/reuse/Carousel/getCarouselData";

// Components, Types and interfaces
import { Hero } from "@/components/reuse/Hero/Hero";
import { Block } from "@/components/reuse/containers/Block/Block";
import { TitleAndText } from "@/components/reuse/TitleAndText/TitleAndText";
import {
  PricePlans,
  PricePlanProps,
} from "@/components/pages/blocks/PricePlans/PricePlans";
import {
  MultiDescription,
  DescriptionProps,
} from "@/components/pages/blocks/MultiDescription/MultiDescription";

// Types and interfaces
import { IHero, ISeo, IWork, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";

// Utilities
import { setMetadata } from "@/components/SEO";
import { getTranslations } from "@/helpers/langUtils";

// Dynamically imported components
const Carousel = dynamic(
  () =>
    import("@/components/reuse/Carousel/Carousel").then(
      (module) => module.Carousel
    ),
  { ssr: false }
);

export interface HennaServicePageProps {
  meta: ISeo;
  hero: IHero;
  tarifText: string;
  pricePlans: PricePlanProps[];
  multiDescriptions: DescriptionProps[];
}

export const getHennaServicePageData = async (locale: LangType) => {
  const type = "hennaServicePage";
  const hennaServiceQuery = hennaServicePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hennaServicePageData: HennaServicePageProps = await useFetchPage(
    hennaServiceQuery,
    type
  );
  return hennaServicePageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const hennaServicePageData: HennaServicePageProps = await getHennaServicePageData(
    locale
  );
  const { metaTitle, metaDesc, metaKeywords } =
    hennaServicePageData?.meta || {};
  const path = LocalPaths.SERVICE + LocalPaths.TATTOO;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    metaKeywords,
    path,
    crawl,
  });
}

export default async function HennaServicePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const hennaServicePageData = await getHennaServicePageData(locale);
  const carouselData: IWork[] = await getCarouselData("henna");
  const translations = getTranslations(locale);

  return (
    hennaServicePageData && (
      <>
        <Hero {...hennaServicePageData?.hero} version={2} />

        <Block variant="default">
          {hennaServicePageData.tarifText && (
            <TitleAndText
              text={hennaServicePageData.tarifText}
              title={translations.titles.tarif}
            />
          )}
          {hennaServicePageData.pricePlans && (
            <PricePlans data={hennaServicePageData.pricePlans} />
          )}
          {hennaServicePageData.multiDescriptions && (
            <MultiDescription descs={hennaServicePageData.multiDescriptions} />
          )}
        </Block>
        {carouselData && (
          <Carousel
            data={carouselData}
            cta={{
              text: translations.buttons.view + " " + translations.nav.henna,
            }}
          />
        )}
      </>
    )
  );
}

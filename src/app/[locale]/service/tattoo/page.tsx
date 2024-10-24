// Next.js and React imports
import { Metadata } from "next";
import dynamic from "next/dynamic";

// API and data fetching
import { tattooServicePageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { getCarouselData } from "@/components/reuse/Carousel/getCarouselData";

// Components, Types and interfaces
import { Hero } from "@/components/reuse/Hero/Hero";
import { Block } from "@/components/reuse/containers/Block/Block";
import {
  PricePlans,
  PricePlanProps,
} from "@/components/pages/blocks/PricePlans/PricePlans";
import {
  MultiDescription,
  DescriptionProps,
} from "@/components/pages/blocks/MultiDescription/MultiDescription";
import {
  Collapsible,
  CollapsibleProps,
} from "@/components/reuse/Collapsible/Collapsible";

// Types and interfaces
import { IHero, ISeo, IWork, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";

// Utilities
import { setMetadata } from "@/components/SEO";
import { getTranslations } from "@/helpers/langUtils";
import { TitleAndText } from "@/components/reuse/TitleAndText/TitleAndText";
import { getImagesFromWorks, shuffleArray } from "@/helpers/functions";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { Approx, ApproxProps } from "@/components/pages/blocks/Approx/Approx";
import { ClientLogger } from "@/helpers/clientLogger";

// Dynamically imported components
const Carousel = dynamic(
  () =>
    import("@/components/reuse/Carousel/Carousel").then(
      (module) => module.Carousel
    ),
  { ssr: false }
);

export interface TattooServicePageProps {
  meta: ISeo;
  hero: IHero;
  tarifText: string;
  pricePlans: PricePlanProps[];
  multiDescriptions: DescriptionProps[];
  collapsible: CollapsibleProps;
}

export const getTattooServicePageData = async (locale: LangType) => {
  const type = "tattooServicePage";
  const tattooServiceQuery = tattooServicePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tattooServicePageData: TattooServicePageProps = await useFetchPage(
    tattooServiceQuery,
    type
  );
  return tattooServicePageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const tattooServicePageData: TattooServicePageProps = await getTattooServicePageData(
    locale
  );
  const { metaTitle, metaDesc, metaKeywords } =
    tattooServicePageData?.meta || {};
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

export default async function TattooServicePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const tattooServicePageData = await getTattooServicePageData(locale);
  const carouselData: IWork[] = await getCarouselData("tattoo");
  const translations = getTranslations(locale);
  const formData: FormTitleProps = await getFormData("approx", locale);

  const images = shuffleArray(getImagesFromWorks(carouselData));
  const approxData: ApproxProps = {
    form: {
      ...formData,
    },
    images: {
      img1: images[0],
      img2: images[1],
      img3: images[2],
    },
  };
  return (
    tattooServicePageData && (
      <>
        {tattooServicePageData?.hero && (
          <Hero {...tattooServicePageData?.hero} version={2} />
        )}

        <Block variant="default" illustrations>
          <ClientLogger slug={carouselData[0].projects[0].slug} />
          {tattooServicePageData.tarifText && (
            <TitleAndText
              title={translations.titles.tarif}
              text={tattooServicePageData.tarifText}
            />
          )}
          {tattooServicePageData.pricePlans && (
            <PricePlans data={tattooServicePageData.pricePlans} />
          )}
          {tattooServicePageData.multiDescriptions && (
            <MultiDescription descs={tattooServicePageData.multiDescriptions} />
          )}
          {formData && <Approx {...approxData} />}
        </Block>
        {carouselData && (
          <Carousel
            data={carouselData}
            cta={{
              text: translations.buttons.view + " " + translations.nav.tattoo,
              link: [LocalPaths.PORTFOLIO, LocalPaths.TATTOO],
            }}
          />
        )}
        <Block variant="default">
          {tattooServicePageData.collapsible && (
            <Collapsible {...tattooServicePageData.collapsible} />
          )}
        </Block>
      </>
    )
  );
}

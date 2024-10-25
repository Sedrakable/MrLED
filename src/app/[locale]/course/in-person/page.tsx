// Next.js and React imports
import { Metadata } from "next";

// API and data fetching
import { inPersonCoursePageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";

// Components, Types and interfaces
import { Hero } from "@/components/reuse/Hero/Hero";
import { Block } from "@/components/reuse/containers/Block/Block";
import { TitleAndText } from "@/components/reuse/TitleAndText/TitleAndText";
import {
  PricePlans,
  PricePlanProps,
  PricePlan,
} from "@/components/pages/blocks/PricePlans/PricePlans";
import {
  MultiDescription,
  DescriptionProps,
} from "@/components/pages/blocks/MultiDescription/MultiDescription";

// Types and interfaces
import { IHero, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n/request";

// Utilities
import { setMetadata } from "@/components/SEO";
import { getTranslations } from "@/helpers/langUtils";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { BigCTA, BigCTAProps } from "@/components/pages/blocks/BigCTA/BigCTA";

// For Main component
import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./Main.module.scss";
import { SpacingArrayType } from "@/helpers/SpacingGenerator";

export interface InPersonCoursePageProps {
  meta: ISeo;
  hero: IHero;
  infoText: any;
  multiDescriptions: DescriptionProps[];
  image: ICustomImage;
  pricePlans1: PricePlanProps[];
  experienceText: any;
  pricePlans2: PricePlanProps[];
  bigCTA: BigCTAProps;
}

export const getInPersonCoursePageData = async (locale: LangType) => {
  const type = "inPersonCoursePage";
  const inPersonCourseQuery = inPersonCoursePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inPersonCoursePageData: InPersonCoursePageProps = await useFetchPage(
    inPersonCourseQuery,
    type
  );
  return inPersonCoursePageData;
};

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: LangType }>;
// }): Promise<Metadata> {
//   const { locale } = await params; // Await the params
//   const inPersonCoursePageData: InPersonCoursePageProps = await getInPersonCoursePageData(
//     locale
//   );
//   const { metaTitle, metaDesc, metaKeywords } =
//     inPersonCoursePageData?.meta || {};
//   const path = LocalPaths.SERVICE + LocalPaths.TATTOO;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function InPersonCoursePage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params; // Await the params
  const data = await getInPersonCoursePageData(locale);
  const translations = getTranslations(locale);

  return (
    data && (
      <>
        {data?.hero && <Hero {...data?.hero} version={2} />}

        <Block variant="default" illustrations>
          {data.infoText && (
            <TitleAndText
              text={data.infoText}
              title={translations.titles.info}
            />
          )}
          <Main
            multiDescriptions={data.multiDescriptions}
            image={data.image}
            pricePlans1={data.pricePlans1}
          />

          {data.infoText && (
            <TitleAndText
              text={data.infoText}
              title={translations.titles.experience}
            />
          )}
          {data.pricePlans1 && <PricePlans data={data.pricePlans2} />}
          {data?.bigCTA && <BigCTA {...data?.bigCTA} />}
        </Block>
      </>
    )
  );
}
interface MainProps {
  multiDescriptions: DescriptionProps[];
  image: ICustomImage;
  pricePlans1: PricePlanProps[];
}

const Main: React.FC<MainProps> = ({
  multiDescriptions,
  image,
  pricePlans1,
}) => {
  const spaceArray: SpacingArrayType = [4, 4, 5, 6];
  return (
    <FlexDiv
      gapArray={spaceArray}
      width100
      flex={{ direction: "column" }}
      className={styles.container}
    >
      <FlexDiv
        gapArray={spaceArray}
        width100
        className={styles.wrapper}
        flex={{ direction: "column" }}
      >
        {image && (
          <SanityImage
            {...image}
            figureclassname={styles.image}
            quality={100}
          />
        )}
        {multiDescriptions && (
          <MultiDescription
            descs={multiDescriptions}
            textAlign="left"
            desktopVertical
          />
        )}
      </FlexDiv>

      {pricePlans1 && (
        <FlexDiv gapArray={spaceArray} width100 className={styles.priceWrapper}>
          {pricePlans1.map((pricePlan) => {
            return <PricePlan key={pricePlan.title} {...pricePlan} />;
          })}
        </FlexDiv>
      )}
    </FlexDiv>
  );
};

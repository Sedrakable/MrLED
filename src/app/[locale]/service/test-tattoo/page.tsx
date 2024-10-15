// Next.js and React imports
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Styling
import styles from "@/styles/jagua.module.scss";

// API and data fetching
import { testTattooServicePageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";

// Components, Types and interfaces
import { Hero } from "@/components/reuse/Hero/Hero";
import { Block } from "@/components/reuse/containers/Block/Block";
import {
  PricePlans,
  PricePlanProps,
} from "@/components/pages/blocks/PricePlans/PricePlans";
import { BigCTAProps } from "@/components/pages/blocks/BigCTA/BigCTA";

// Types and interfaces
import { IDisplay, IHero, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";

// Utilities
import { setMetadata } from "@/components/SEO";
import { TextWrapper } from "@/components/reuse/containers/TextWrapper/TextWrapper";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";
import { Display } from "@/components/reuse/Display/Display";

// Dynamically imported components
const BigCTA = dynamic(
  () =>
    import("@/components/pages/blocks/BigCTA/BigCTA").then(
      (module) => module.BigCTA
    ),
  {
    ssr: false,
  }
);

export interface TestTattooServicePageProps {
  meta: ISeo;
  hero: IHero;
  display: IDisplay;
  desc: any;
  pricePlans: PricePlanProps[];
  bigCTA: BigCTAProps;
}

export const getTestTattooServicePageData = async (locale: LangType) => {
  const type = "tattooServicePage";
  const tattooServiceQuery = testTattooServicePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const testTattooServicePageData: TestTattooServicePageProps = await useFetchPage(
    tattooServiceQuery,
    type
  );
  return testTattooServicePageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const testTattooServicePageData: TestTattooServicePageProps = await getTestTattooServicePageData(
    locale
  );
  const { metaTitle, metaDesc, metaKeywords } =
    testTattooServicePageData?.meta || {};
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

export default async function TestTattooServicePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const testTattooServicePageData = await getTestTattooServicePageData(locale);

  return (
    testTattooServicePageData && (
      <>
        <Hero {...testTattooServicePageData?.hero} version={2} />

        {testTattooServicePageData.display && (
          <div className={styles.jaguaWrapper}>
            <Block variant="full-width">
              <Display
                {...testTattooServicePageData?.display}
                version="service"
              />
            </Block>
          </div>
        )}

        <Block variant="default">
          <div className={styles.jaguaWrapper}>
            {testTattooServicePageData.desc && (
              <TextWrapper version={3}>
                <PortableTextContent
                  value={testTattooServicePageData.desc}
                  color="dark-burgundy"
                  textAlign="center"
                />
              </TextWrapper>
            )}
          </div>
          <div className={styles.jaguaWrapper}>
            {testTattooServicePageData.pricePlans && (
              <PricePlans data={testTattooServicePageData.pricePlans} />
            )}
          </div>
          {testTattooServicePageData?.bigCTA && (
            <BigCTA {...testTattooServicePageData?.bigCTA} />
          )}
        </Block>
      </>
    )
  );
}

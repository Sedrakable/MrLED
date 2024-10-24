import { ISeo, LocalPaths, IHero, IWork } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import dynamic from "next/dynamic";
import { WorkPageProps } from "./[projectType]/page";
import { portfolioPageQuery } from "@/app/api/generateSanityQueries";
import { HistoryProps } from "@/components/pages/blocks/History/History";
import { getCarouselData } from "@/components/reuse/Carousel/getCarouselData";
import { History } from "@/components/pages/blocks/History/History";
import { Block } from "@/components/reuse/containers/Block/Block";
import { Works } from "@/components/pages/blocks/Works/Works";
import { Hero } from "@/components/reuse/Hero/Hero";

export interface PortfolioPageProps {
  meta: ISeo;
  hero: IHero;
  works: WorkPageProps[];
  history: HistoryProps;
}
const Carousel = dynamic(
  () =>
    import("@/components/reuse/Carousel/Carousel").then(
      (module) => module.Carousel
    ),
  {
    ssr: false,
  }
);

const getPortfolioPageData = async (locale: LangType) => {
  const type = "PortfolioPage";
  const PortfolioQuery = portfolioPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const PortfolioPageData: PortfolioPageProps = await useFetchPage(
    PortfolioQuery,
    type
  );
  return PortfolioPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const portfolioPageData = await getPortfolioPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = portfolioPageData.meta;
  const path = LocalPaths.PORTFOLIO;
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

export default async function PortfolioPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const portfolioPageData = await getPortfolioPageData(locale);
  const carouselData: IWork[] = await getCarouselData();

  return (
    portfolioPageData && (
      <>
        {portfolioPageData?.hero && (
          <Hero {...portfolioPageData?.hero} version={2} />
        )}

        <Block variant="default" illustrations>
          {portfolioPageData?.works && (
            <Works worksData={portfolioPageData?.works} />
          )}
          {portfolioPageData?.history && (
            <History {...portfolioPageData.history} />
          )}
        </Block>
        {carouselData && <Carousel data={carouselData} />}
      </>
    )
  );
}

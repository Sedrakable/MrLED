import { ISeo, LocalPaths, IHero, IHistory, IWork } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import dynamic from "next/dynamic";
import { WorkPageProps } from "./[slug]/page";
import { portoflioPageQuery } from "@/app/api/generateSanityQueries";
import { Carousel } from "@/components/reuse/containers/Carousel/Carousel";
import { getCarouselData } from "../page";

export interface PortfolioPageProps {
  meta: ISeo;
  hero: IHero;
  works: WorkPageProps[];
  history: IHistory;
}
const Block = dynamic(
  () =>
    import("@/components/reuse/containers/Block/Block").then(
      (module) => module.Block
    ),
  {
    ssr: false,
  }
);

const Hero = dynamic(
  () => import("@/components/reuse/Hero/Hero").then((module) => module.Hero),
  {
    ssr: false,
  }
);

const History = dynamic(
  () =>
    import("@/components/pages/blocks/History/History").then(
      (module) => module.History
    ),
  {
    ssr: false,
  }
);

const Works = dynamic(
  () =>
    import("@/components/pages/blocks/Works/Works").then(
      (module) => module.Works
    ),
  {
    ssr: false,
  }
);

const getPortoflioPageData = async (locale: LangType) => {
  const type = "PortoflioPage";
  const PortoflioQuery = portoflioPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const PortoflioPageData: PortfolioPageProps = await useFetchPage(
    PortoflioQuery,
    type
  );
  return PortoflioPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const PortoflioPageData = await getPortoflioPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = PortoflioPageData.meta;
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

export default async function PortoflioPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const portoflioPageData = await getPortoflioPageData(locale);
  const carouselData: IWork[] = await getCarouselData();

  return (
    portoflioPageData && (
      <>
        {portoflioPageData?.hero && (
          <Hero {...portoflioPageData?.hero} version={2} />
        )}

        <Block variant="default">
          {portoflioPageData?.works && (
            <Works worksData={portoflioPageData?.works} />
          )}
          {portoflioPageData?.history && (
            <History {...portoflioPageData.history} />
          )}
        </Block>
        {carouselData && <Carousel data={carouselData} />}
      </>
    )
  );
}

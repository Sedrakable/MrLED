import {
  LocalPaths,
  ISeo,
  IHomeHero,
  IDisplay,
  IHistory,
  IReview,
  IBigCTA,
  IWork,
} from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import dynamic from "next/dynamic";
import { carouselQuery, homePageQuery } from "@/app/api/generateSanityQueries";
import { WorkPageProps } from "./portfolio/[slug]/page";

const Hero = dynamic(
  () => import("@/components/reuse/Hero/Hero").then((module) => module.Hero),
  {
    ssr: false,
  }
);

const Block = dynamic(
  () =>
    import("@/components/reuse/containers/Block/Block").then(
      (module) => module.Block
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
const Services = dynamic(
  () =>
    import("@/components/pages/home/Services/Services").then(
      (module) => module.Services
    ),
  {
    ssr: false,
  }
);
const Carousel = dynamic(
  () =>
    import("@/components/reuse/containers/Carousel/Carousel").then(
      (module) => module.Carousel
    ),
  {
    ssr: false,
  }
);

const Reviews = dynamic(
  () =>
    import("@/components/pages/blocks/Reviews/Reviews").then(
      (module) => module.Reviews
    ),
  {
    ssr: false,
  }
);
const BigCTA = dynamic(
  () =>
    import("@/components/pages/blocks/BigCTA/BigCTA").then(
      (module) => module.BigCTA
    ),
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

export interface HomePageProps {
  meta: ISeo;
  homeHero: IHomeHero;
  services: IDisplay[];
  works: WorkPageProps[];
  history: IHistory;
  reviews: IReview[];
  bigCTA: IBigCTA;
}

export const getHomePageData = async (locale: LangType) => {
  const type = "homePage";
  const homeQuery = homePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const homePageData: HomePageProps = await useFetchPage(homeQuery, type);
  return homePageData;
};

export const getCarouselData = async () => {
  const type = "carousel";
  const carouselQueryData = carouselQuery(undefined);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const carouselData: IWork[] = await useFetchPage(carouselQueryData, type);
  return carouselData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const homePageData = await getHomePageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = homePageData.meta;
  const path = LocalPaths.HOME;
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

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const homePageData = await getHomePageData(locale);
  const carouselData: IWork[] = await getCarouselData();

  return (
    <>
      {homePageData?.homeHero && (
        <Hero {...homePageData?.homeHero} version={1} />
      )}
      {homePageData?.services && (
        <Block variant="full-width">
          <Services services={homePageData.services} />
        </Block>
      )}
      {carouselData && <Carousel data={carouselData} />}
      <Block variant="default">
        {homePageData?.works && <Works worksData={homePageData?.works} />}
        {homePageData?.history && <History {...homePageData.history} />}
        {homePageData?.reviews && <Reviews reviews={homePageData.reviews} />}
        {homePageData?.bigCTA && <BigCTA {...homePageData?.bigCTA} />}
      </Block>

      {/* <div
        style={{
          height: "500px",
          width: "100vw",
          background: "red",
        }}
      ></div> */}
      {/* <WorkSlider {...homePageData?.work} />
      
      <Values {...homePageData.values} />
      <About content={{ ...homePageData?.about?.content, cta: true }} />
      <Inspired /> */}
    </>
  );
}

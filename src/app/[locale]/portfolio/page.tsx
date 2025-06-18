import { ISeo, IWorkBlock } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";

import { portfolioPageQuery } from "@/app/api/generateSanityQueries";
import {
  IPortfolioHeroProps,
  PortfolioHero,
} from "@/components/pages/PortfolioPage/PortfolioHero/PortfolioHero";
import { Projects } from "@/components/pages/PortfolioPage/Projects/Projects";

export interface PortfolioPageProps {
  meta: ISeo;
  portfolioHero: IPortfolioHeroProps;
  workBlock: IWorkBlock;
}

const getPortfolioPageData = async (
  locale: LangType
): Promise<PortfolioPageProps> => {
  return await fetchPage(portfolioPageQuery(locale));
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

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);Para
  const { locale } = await params;

  const data = await getPortfolioPageData(locale);

  return (
    data && (
      <>
        {data.portfolioHero && <PortfolioHero {...data.portfolioHero} />}
        {data.workBlock && <Projects {...data.workBlock} />}
      </>
    )
  );
}

import { ISeo, IWorkBlock, LocalPaths } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";

import { portfolioPageQuery } from "@/app/api/generateSanityQueries";
import {
  IPortfolioHeroProps,
  PortfolioHero,
} from "@/components/pages/PortfolioPage/PortfolioHero/PortfolioHero";
import { Projects } from "@/components/pages/PortfolioPage/Projects/Projects";
import { Metadata } from "next";
import { setMetadata } from "@/app/api/SEO";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = LocalPaths.PORTFOLIO;
  const crawl = true;
  const data = await getPortfolioPageData(locale);

  // Add fallback values in case landingPageData is null
  const metaTitle = data?.meta?.metaTitle || "MR LED";
  const metaDesc = data?.meta?.metaDesc || "MR LED";

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

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

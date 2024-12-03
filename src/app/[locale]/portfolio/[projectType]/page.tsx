import { workPageQuery } from "@/app/api/generateSanityQueries";
import { fetchPageData } from "@/app/api/useFetchPage";
import { Projects } from "@/components/pages/blocks/Projects/Projects";
import { Works } from "@/components/pages/blocks/Works/Works";
import { Block } from "@/components/reuse/containers/Block/Block";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { Hero } from "@/components/reuse/Hero/Hero";
import { Modal } from "@/components/reuse/Modal";
import { setMetadata } from "@/components/SEO";
import { IHero, ISeo, IWork, LocalPaths, ProjectType } from "@/data.d";
import { ClientLogger } from "@/helpers/clientLogger";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";

export interface WorkPageProps {
  meta: ISeo;
  path: LocalPaths;
  reserve: boolean;
  hero: IHero;
  work: IWork;
}

export const getWorkPageData = async (slug: string) => {
  const workQuery = workPageQuery(slug);

  const workData: WorkPageProps = await fetchPageData(workQuery);

  return workData;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType; projectType: string }>;
}): Promise<Metadata> {
  const { locale, projectType } = await params; // Await the params
  const portfolioPageData = await getWorkPageData(projectType);
  const { metaTitle, metaDesc, metaKeywords } = portfolioPageData.meta;
  const path = `${LocalPaths.PORTFOLIO}/${projectType}`;
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

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: LangType; projectType: string }>;
}) {
  const { projectType } = await params; // Await the params
  const workPageData: WorkPageProps = await getWorkPageData(projectType);

  return (
    workPageData && (
      <>
        <Hero {...workPageData.hero} version={3} />
        {workPageData.work.projects && (
          <Block variant="default">
            <Projects
              projects={workPageData.work.projects}
              workType={projectType as ProjectType}
            />
          </Block>
        )}
      </>
    )
  );
}

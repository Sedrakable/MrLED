import { workPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
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
import { LangType } from "@/i18n";
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
  const type = "work";

  const workQuery = workPageQuery(slug);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const workData: WorkPageProps = await useFetchPage(
    workQuery,
    `${type}-${slug}`
  );

  return workData;
};

// export async function generateMetadata({
//   params: { locale, slug },
// }: {
//   params: { locale: LangType; slug: string };
// }): Promise<Metadata> {
//   const workPageData: WorkPageProps = await getWorkPageData(slug);
//   const path = `${LocalPaths.PORTFOLIO}/${slug}`;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle: workPageData.meta.metaTitle,
//     metaDesc: workPageData.meta.metaDesc,
//     metaKeywords: workPageData.meta.metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function WorkPage({
  params: { locale, projectType },
}: {
  params: { locale: LangType; projectType: string };
}) {
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

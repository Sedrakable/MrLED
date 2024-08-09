import { workPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { Works } from "@/components/pages/blocks/Works/Works";
import { Block } from "@/components/reuse/containers/Block/Block";
import { setMetadata } from "@/components/SEO";
import { IHero, ISeo, IWork, LocalPaths } from "@/data.d";
import { ClientLogger } from "@/helpers/clientLogger";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Hero = dynamic(
  () => import("@/components/reuse/Hero/Hero").then((module) => module.Hero),
  {
    ssr: false,
  }
);

// const Modal = dynamic(
//   () => import("@/components/reuse/Modal").then((module) => module.Modal),
//   {
//     ssr: false,
//   }
// );

const Projects = dynamic(
  () =>
    import("@/components/pages/blocks/Projects/Projects").then(
      (module) => module.Projects
    ),
  {
    ssr: false,
  }
);

export interface WorkPageProps {
  meta: ISeo;
  path: LocalPaths;
  reserve: boolean;
  hero: IHero;
  work: IWork;
}

const getWorkPageData = async (slug: string) => {
  const type = "work";

  const workQuery = workPageQuery(slug);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const workData: WorkPageProps = await useFetchPage(
    workQuery,
    `${type}-${slug}`
  );

  return workData;
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}): Promise<Metadata> {
  const workPageData: WorkPageProps = await getWorkPageData(slug);
  const path = `${LocalPaths.PORTFOLIO}/${slug}`;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle: workPageData.meta.metaTitle,
    metaDesc: workPageData.meta.metaDesc,
    metaKeywords: workPageData.meta.metaKeywords,
    path,
    crawl,
  });
}

export default async function WorkPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const workPageData: WorkPageProps = await getWorkPageData(slug);
  // console.log("workPageData", workPageData);
  return (
    workPageData.work && (
      <>
        <Hero {...workPageData.hero} version={3} />
        {/* <ClientLogger slug={slug} /> */}
        <Block variant="default">
          <Projects projects={workPageData.work.projects} type={slug} />
        </Block>
      </>
    )
  );
}

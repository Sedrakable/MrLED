import { tattooServicePageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { setMetadata } from "@/components/SEO";
import { IHero, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Hero = dynamic(
  () => import("@/components/reuse/Hero/Hero").then((module) => module.Hero),
  {
    ssr: false,
  }
);

export interface TattooServicePageProps {
  meta: ISeo;
  hero: IHero;
  // services: IServices;
  // values: IValues;
  // about: IAbout;
  // work: IWorkBlock;
}

export const getTattooServicePageData = async (locale: LangType) => {
  const type = "tattooServicePage";
  const tattooServiceQuery = tattooServicePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tattooServicePageData: TattooServicePageProps = await useFetchPage(
    tattooServiceQuery,
    type
  );
  return tattooServicePageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const tattooServicePageData: TattooServicePageProps = await getTattooServicePageData(
    locale
  );
  const { metaTitle, metaDesc, metaKeywords } = tattooServicePageData.meta;
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

export default async function ServicePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const tattooServicePageData = await getTattooServicePageData(locale);
  // const servicePageData = await getServicePageData(locale, slug);
  return (
    <>
      <Hero {...tattooServicePageData?.hero} version={2} />
    </>
  );
}

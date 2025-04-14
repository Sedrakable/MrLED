import { ISeo, IHero, ServiceType } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";

import NavWrapperServer from "@/components/pages/NavWrapper/NavWrapperServer";
import { homePageQuery } from "../api/generateSanityQueries";

export interface HomePageProps {
  meta: ISeo;
  hero: IHero;
}

const getHomePageData = async (locale: LangType) => {
  const homeQuery = homePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data: HomePageProps = await useFetchPage(homeQuery);

  return data;
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);
  const { locale } = await params;
  const data = await getHomePageData(locale);

  return (
    <NavWrapperServer locale={locale} theme="light">
      <></>
      {/* {data && (
        <>
          <Hero
            {...data.hero}
            cta={{
              text: translations.buttons.buildSign,
              path: `/${locale}${LocalPaths.WOOD}`,
              scrollTarget: LocalTargets.WOODFORM,
            }}
          />
          {carouselImages && <Carousel images={carouselImages} />}
          {data.questions && (
            <Questions questions={data.questions} theme="light" />
          )}

          {data.solutionBlock && (
            <SolutionBlock {...data.solutionBlock} theme="home" />
          )}
          {data.testimonials && (
            <Testimonials testimonials={data.testimonials} theme="light" />
          )}
          {data.processBlock && (
            <ProcessAndQuote
              processes={data.processBlock.processes}
              {...formData}
              form={form}
              video={{
                firstIndex: 0,
                lastIndex: 400,
                folder: "home",
                format: "webp",
              }}
            />
          )}
          {data.featureBlock && (
            <Features features={data.featureBlock.features} theme="light" />
          )}
          {data.collapsible && <Collapsible {...data.collapsible} />}
        </>
      )} */}
    </NavWrapperServer>
  );
}

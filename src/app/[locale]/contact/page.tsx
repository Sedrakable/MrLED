import { ISeo, ICollapsible } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";

import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { contactPageQuery } from "@/app/api/generateSanityQueries";
import {
  HeroAndForm,
  IHeroAndFormProps,
} from "@/components/pages/ContactPage/HeroAndForm/HeroAndForm";

export interface ContactPageProps {
  meta: ISeo;
  contactHero: IHeroAndFormProps;
  collapsible: ICollapsible;
}

const getContactPageData = async (locale: LangType) => {
  const homeQuery = contactPageQuery(locale);
  const data: ContactPageProps = await fetchPage(homeQuery);

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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);Para
  const { locale } = await params;

  const data = await getContactPageData(locale);

  return (
    data && (
      <>
        {data.contactHero && <HeroAndForm {...data.contactHero} />}
        {data.collapsible && <Collapsible {...data.collapsible} />}
      </>
    )
  );
}

import { ISeo, ICollapsible, LocalPaths } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";

import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { contactPageQuery } from "@/app/api/generateSanityQueries";
import {
  HeroAndForm,
  IHeroAndFormProps,
} from "@/components/pages/ContactPage/HeroAndForm/HeroAndForm";
import { Metadata } from "next";
import { setMetadata } from "@/app/api/SEO";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = LocalPaths.CONTACT;
  const crawl = true;
  const data = await getContactPageData(locale);

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

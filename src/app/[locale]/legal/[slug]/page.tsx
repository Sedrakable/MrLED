import React from "react";
import { ILegalPage } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { legalPageQuery } from "@/app/api/generateSanityQueries";
import { LegalPageComp } from "@/components/pages/LegalPage/LegalPage";

export default async function LegalPage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const legalQuery = legalPageQuery(locale, slug);
  const legalPageData: ILegalPage = await fetchPage(legalQuery);
  return legalPageData && <LegalPageComp {...legalPageData} />;
}

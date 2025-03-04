import React from "react";
import { ILegalPage } from "@/data.d";
import { fetchPageData } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n/request";
import { legalPageQuery } from "@/app/api/generateSanityQueries";
import { LegalPageComp } from "@/components/pages/LegalPage/LegalPage";
import { error } from "node:console";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: LangType; slug: string }>;
}) {
  const { locale, slug } = await params;
  const legalQuery = legalPageQuery(locale, slug);
  if (!legalQuery) return error("No query found for legal page");
  const legalPageData: ILegalPage = await fetchPageData(legalQuery);
  return legalPageData && <LegalPageComp {...legalPageData} />;
}

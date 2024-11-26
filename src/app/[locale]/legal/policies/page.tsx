import React from "react";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n/request";
import { policiesPageQuery } from "@/app/api/generateSanityQueries";
import {
  Collapsible,
  CollapsibleProps,
} from "@/components/reuse/Collapsible/Collapsible";
import { Block } from "@/components/reuse/containers/Block/Block";
import { TitleWrapper } from "@/components/reuse/containers/TitleWrapper/TitleWrapper";
import { getTranslations } from "@/helpers/langUtils";

export interface PoliciesPageProps {
  collapsibles: CollapsibleProps[];
}
export default async function Policies({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  const trans = getTranslations(locale);
  const policiesQuery = policiesPageQuery(locale);
  const policiesPageData: PoliciesPageProps = await useFetchPage(
    policiesQuery,
    "policiesPage"
  );

  return (
    <>
      {policiesPageData?.collapsibles && (
        <Block variant="default" illustrations title={trans.titles.policies}>
          {policiesPageData.collapsibles.map((collapsible, index) => (
            <Collapsible key={index} {...collapsible} />
          ))}
        </Block>
      )}
    </>
  );
}

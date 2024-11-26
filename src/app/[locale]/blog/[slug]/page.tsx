import React from "react";

import { useFetchPage } from "@/app/api/useFetchPage";
import { IArticle, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { articlePageQuery } from "@/app/api/generateSanityQueries";
import { Article } from "@/components/pages/blocks/Article/Article";

interface ArticlePageProps extends IArticle {
  meta: ISeo;
}

const getArticlePageData = async (locale: LangType, slug: string) => {
  const type = "articlePage";
  const articleQuery = articlePageQuery(locale, slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const articleData: ArticlePageProps = await useFetchPage(
    articleQuery,
    `${type}-${slug}`
  );

  return articleData;
};

// export async function generateMetadata({
//   params: { locale, slug },
// }: {
//   params: { locale: LangType; slug: string };
// }): Promise<Metadata> {
//   const articlePageData: ArticlePageProps = await getArticlePageData(
//     locale,
//     slug
//   );
//   const { metaTitle, metaDesc, metaKeywords } = articlePageData.meta;
//   const path = `${LocalPaths.BLOG}/${slug}`;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: LangType; slug: string }>;
}) {
  const { locale, slug } = await params; // Await the params
  const articleData: ArticlePageProps = await getArticlePageData(locale, slug);

  return articleData && <Article {...articleData} />;
}

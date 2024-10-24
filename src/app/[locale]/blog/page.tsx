import { blogPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";

import { IBlog, ISeo } from "@/data.d";
import { LangType } from "@/i18n";
import dynamic from "next/dynamic";
import React from "react";

const Blog = dynamic(
  () =>
    import("@/components/pages/blocks/Blog/Blog").then((module) => module.Blog),
  {
    ssr: false,
  }
);
export interface BlogPageProps {
  meta: ISeo;
  blog: IBlog;
}

export const getBlogPageData = async (locale: LangType) => {
  const type = "blogPage";
  const blogQuery = blogPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const blogPageData: BlogPageProps = await useFetchPage(blogQuery, type);
  return blogPageData;
};

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: LangType };
// }): Promise<Metadata> {
//   const blogPageData: BlogPageProps = await getBlogPageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = blogPageData.meta;
//   const path = LocalPaths.BLOG;
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

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const blogPageData: BlogPageProps = await getBlogPageData(locale);

  return <>{blogPageData && <Blog {...blogPageData.blog} />}</>;
}

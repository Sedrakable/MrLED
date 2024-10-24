"use client";
import React, { useCallback, useEffect } from "react";
import FlexDiv from "@/components/reuse/FlexDiv";
import { IArticle, IBlog, LocalPaths } from "@/data.d";
import { Block } from "../../../reuse/containers/Block/Block";
import { TitleWrapper } from "@/components/reuse/containers/TitleWrapper/TitleWrapper";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { Display } from "@/components/reuse/Display/Display";
import Link from "next/link";
import { useArticleFilters } from "../../../reuse/Form/CustomFilters/useArticleFilters";
import { ArticleFilters } from "@/components/reuse/Form/CustomFilters/ArticleFilters";
import { setToLocalStorage } from "@/helpers/localStorage";
import { ARTICLES_ORDER_STORAGE_KEY } from "../Article/Article";
import { blogPageQuery } from "@/app/api/generateSanityQueries";
import { BlogPageProps } from "@/app/[locale]/blog/page";
import { useFetchPage } from "@/app/api/useFetchPage";

export const filterArticles = async (
  articles: IArticle[],
  locale: LangType
) => {
  const translations = getTranslations(locale);

  const {
    filteredArticles,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useArticleFilters(articles, translations);

  setToLocalStorage(ARTICLES_ORDER_STORAGE_KEY, filteredArticles);

  return filteredArticles;
};

export const Blog: React.FC<IBlog> = ({ articles }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const {
    filteredArticles,
    filterHandlers,
    filterOptions,
    sortOptions,
  } = useArticleFilters(articles, translations);

  useEffect(() => {
    setToLocalStorage(ARTICLES_ORDER_STORAGE_KEY, filteredArticles);
  }, [filteredArticles]);

  return (
    articles && (
      <Block variant="full-width">
        <TitleWrapper title={translations.titles.blog}>
          <FlexDiv width100 flex={{ direction: "column" }} gapArray={[4]}>
            <div
              style={{ maxWidth: `var(--screen-width-large)`, width: "100%" }}
            >
              <ArticleFilters
                filterOptions={filterOptions}
                onFilterChange={filterHandlers}
                translations={translations}
                sortOptions={sortOptions}
              />
            </div>
            <FlexDiv
              width100
              flex={{ direction: "column" }}
              gapArray={[10, 10, 11, 12]}
            >
              {filteredArticles.map((article, index) => {
                return (
                  <Link
                    href={`/${locale}${LocalPaths.BLOG}/${article.path}`}
                    aria-label={article.path}
                    key={index}
                  >
                    <Display
                      backgroundImage={article.customImage}
                      subTitle={article.title}
                      desc={article.desc}
                      version="article"
                      date={article.date}
                      reverse={index % 2 === 0}
                    />
                  </Link>
                );
              })}
            </FlexDiv>
          </FlexDiv>
        </TitleWrapper>
      </Block>
    )
  );
};

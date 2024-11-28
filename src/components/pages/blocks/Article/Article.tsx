"use client";
import styles from "./Article.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { Block } from "@/components/reuse/containers/Block/Block";
import { IArticle, IBlock, ICartProduct, ICta, LocalPaths } from "@/data.d";
import { Heading } from "@/components/reuse/Heading";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { ArticleNavigation } from "./ArticleNavigation/ArticleNavigation";
import { getFromLocalStorage, setToLocalStorage } from "@/helpers/localStorage";
import { useState, useCallback, use, useEffect } from "react";
import { LangType } from "@/i18n/request";
import { articlesOrderQuery } from "@/app/api/generateSanityQueries";
import { fetchPageData } from "@/app/api/useFetchPage";
import { useLocale } from "next-intl";
import { Button } from "@/components/reuse/Button";
import { getTranslations } from "@/helpers/langUtils";
import { contentBlocks } from "@/components/reuse/ContentBlock/ContentBlock";
import { TextWrapper } from "@/components/reuse/containers/TextWrapper/TextWrapper";

export const ARTICLES_ORDER_STORAGE_KEY = "articlesOrder";

export const getArticlesOrderData = async (locale: LangType) => {
  const type = "articleOrder";
  const articleQuery = articlesOrderQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const articlesOrderData: IArticle[] = await fetchPageData(articleQuery);
  return articlesOrderData;
};

export const Article: React.FC<IArticle> = ({
  content,
  date,
  customImage,
  imageText,
  title,
  desc,
}) => {
  const locale = useLocale() as LangType;
  const trans = getTranslations(locale);
  const [pageOrder, setPageOrder] = useState<IArticle[]>(
    () => getFromLocalStorage<IArticle[]>(ARTICLES_ORDER_STORAGE_KEY) || []
  );

  useEffect(() => {
    const fetchOrder = async () => {
      let order =
        getFromLocalStorage<IArticle[]>(ARTICLES_ORDER_STORAGE_KEY) || [];
      if (order.length === 0) {
        order = await getArticlesOrderData(locale);
      }
      setPageOrder(order);
    };
    fetchOrder();
    // I want to make the value between 0 and 50

    const randomValue = Math.floor(Math.random() * 51);
    document.documentElement.style.setProperty(
      "--random-translate-y",
      `${randomValue}%`
    );
  }, [locale]);

  // I want to take the article array and turn it into a CTA array
  const ctaPageOrder: ICta[] = pageOrder.map((article) => ({
    text: article.title,
    link: [`/${article.path}`],
  }));

  return (
    <Block variant="default" illustrations>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        width100
        gapArray={[5]}
      >
        <Button
          variant="extra"
          path={`/${locale}${LocalPaths.BLOG}`}
          fit="shrink"
          iconProps={{
            icon: "arrow",
            rotate: 90,
            side: "left",
            size: "regular",
          }}
        >
          {trans.nav.blog}
        </Button>
        <FlexDiv
          flex={{
            direction: "column",
            x: "flex-start",
          }}
          className={styles.article}
          gapArray={[2, 2, 3, 4]}
          as="article"
        >
          <Paragraph level="big" color="dark-burgundy">
            {date}
          </Paragraph>
          <Heading
            level="3"
            as="h1"
            color="burgundy"
            weight={400}
            paddingBottomArray={[1, 0]}
          >
            {title}
          </Heading>
          {/* I want to have th image on the left and text on the right if its fits properly */}
          <FlexDiv
            flex={{ direction: "column", y: "flex-start" }}
            width100
            className={styles.heading}
            padding={{ bottom: [3, 4, 4, 5] }}
          >
            <FlexDiv
              width100
              className={styles.imgWrapper}
              gapArray={[2]}
              flex={{ direction: "column" }}
            >
              <SanityImage {...customImage} />
              {imageText && (
                <Paragraph level="small" color="dark-burgundy">
                  {imageText}
                </Paragraph>
              )}
            </FlexDiv>
            <TextWrapper version={2} variant="small">
              <Paragraph
                level="regular"
                color="burgundy"
                weight={500}
                textAlign="center"
              >
                {desc}
              </Paragraph>
            </TextWrapper>
          </FlexDiv>

          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            className={styles.content}
            width100
            as="section"
          >
            {contentBlocks({ blocks: content })}
          </FlexDiv>
        </FlexDiv>
        {ctaPageOrder.length > 1 && (
          <ArticleNavigation pageOrder={ctaPageOrder} />
        )}
      </FlexDiv>
    </Block>
  );
};

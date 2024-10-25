"use client";
import React, { FC } from "react";
import styles from "./PricePlans.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { ICta, IExternalLink } from "../../../../data.d";
import {
  ICustomImage,
  SanityImage,
} from "../../../reuse/SanityImage/SanityImage";
import { getTranslations } from "../../../../helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { useWindowResize } from "@/helpers/useWindowResize";
import { TitleWrapper } from "../../../reuse/containers/TitleWrapper/TitleWrapper";
import { Button } from "@/components/reuse/Button";

export interface PricePlanProps {
  image?: ICustomImage;
  title: string;
  price: string;
  desc?: string;
  features?: string[];
  cta?: ICta;
  externalLink?: IExternalLink;
}

export const PricePlan: FC<PricePlanProps> = ({
  image,
  title,
  price,
  desc,
  features,
  cta,
  externalLink,
}) => {
  const locale = useLocale() as LangType;
  const { isMobileOrTablet } = useWindowResize();
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      className={styles.container}
      aria-label={title}
    >
      {image && (
        <SanityImage
          image={image?.image}
          alt={image?.alt}
          figureclassname={cn(styles.image)}
          quality={50}
        />
      )}

      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        className={styles.info}
        gapArray={[3, 3, 3, 3]}
        padding={{ all: [4, 5, 5, 6], top: [3, 4, 4, 5] }}
        width100
      >
        <Heading
          as="h4"
          level="5"
          color="cream-white"
          weight={500}
          className={styles.title}
        >
          {title}
        </Heading>
        <span className={styles.priceWrapper}>
          <Paragraph
            level="big"
            color="burgundy"
            weight={500}
            className={styles.price}
          >
            ${price}
          </Paragraph>
        </span>
        {desc && (
          <Paragraph
            level="small"
            color="cream-white"
            weight={400}
            className={styles.desc}
          >
            {desc}
          </Paragraph>
        )}

        {features && (
          <FlexDiv
            className={styles.features}
            flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
            gapArray={[2]}
            padding={{ bottom: [2] }}
          >
            {features.map((feature, key) => {
              return (
                <Paragraph
                  key={key}
                  level="regular"
                  color="cream-white"
                  weight={400}
                  className={styles.feature}
                >
                  {feature}
                </Paragraph>
              );
            })}
          </FlexDiv>
        )}

        {cta && (
          <Button
            variant="extra"
            path={`/${locale}${cta?.link?.join("")}`}
            fit={isMobileOrTablet ? "grow" : undefined}
          >
            {cta.text}
          </Button>
        )}
        {externalLink && (
          <Button
            variant="extra"
            href={externalLink.link}
            fit={isMobileOrTablet ? "grow" : undefined}
            target="_blank"
          >
            {externalLink.text}
          </Button>
        )}
      </FlexDiv>
    </FlexDiv>
  );
};

export interface PricePlansProps {
  data: PricePlanProps[];
  version?: 1 | 2;
}
export const PricePlans: React.FC<PricePlansProps> = ({
  data,
  version = 1,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  return (
    <TitleWrapper title={translations.titles.work}>
      <FlexDiv
        gapArray={[6, 4, 5, 6]}
        width100
        className={cn(styles.wrapper, styles[`version${version}`])}
      >
        {data.map((pricePlan) => {
          return <PricePlan key={pricePlan.title} {...pricePlan} />;
        })}
      </FlexDiv>
    </TitleWrapper>
  );
};

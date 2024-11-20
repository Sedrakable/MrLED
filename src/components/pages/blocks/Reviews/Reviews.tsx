"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { IReview, IReviews } from "../../../../data.d";

import { TextWrapper } from "../../../reuse/containers/TextWrapper/TextWrapper";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { TitleWrapper } from "../../../reuse/containers/TitleWrapper/TitleWrapper";
import { Heading } from "@/components/reuse/Heading";
import { Icon } from "@/components/reuse/Icon";
import { AnimatedWrapper } from "@/components/reuse/AnimatedWrapper/AnimatedWrapper";

export const Review: React.FC<IReview> = ({ name, message }) => {
  return (
    <FlexDiv flex={{ direction: "column" }} className={styles.review}>
      <Heading as="h5" level="5" color="dark-burgundy" textAlign="center">
        {name}
      </Heading>
      <Paragraph
        level="regular"
        color="darkest-burgundy"
        textAlign="center"
        paddingBottomArray={[3]}
      >
        {`"${message}"`}
      </Paragraph>
      <FlexDiv gapArray={[3]}>
        {Array.from({ length: 5 }, (_, index) => (
          <Icon key={index} icon="star" size="regular" />
        ))}
      </FlexDiv>
    </FlexDiv>
  );
};

export const Reviews: React.FC<IReviews> = ({ reviews }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  return (
    <TitleWrapper title={translations.titles.reviews}>
      <AnimatedWrapper from="inside">
        <TextWrapper>
          <FlexDiv gapArray={[7, 6, 6, 6]} className={styles.reviews} wrap>
            {reviews.map((review) => (
              <Review
                key={review.name}
                name={review.name}
                message={review.message}
              />
            ))}
          </FlexDiv>
        </TextWrapper>
      </AnimatedWrapper>
    </TitleWrapper>
  );
};

"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading/Heading";
import { Icon } from "@/components/reuse/Icon/Icon";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { IReview, IReviews } from "@/data.d";

import { TextWrapper } from "@/components/containers/TextWrapper/TextWrapper";
import { Block } from "@/components/containers/Block";

export const Review: React.FC<IReview> = ({ name, review, title }) => {
  return (
    <FlexDiv flex={{ direction: "column" }} className={styles.review}>
      <Heading as="span" level="5" color="grad" textAlign="center">
        {name}
      </Heading>
      <Paragraph
        level="big"
        color="white"
        textAlign="center"
        weight={600}
        paddingBottomArray={[3]}
      >
        {`-${title}`}
      </Paragraph>
      <Paragraph
        level="regular"
        color="white"
        textAlign="center"
        paddingBottomArray={[4]}
      >
        {`"${review}"`}
      </Paragraph>
      <FlexDiv gapArray={[3]}>
        {Array.from({ length: 5 }, (_, index) => (
          <Icon key={index} icon="star" size="small" color="grad" />
        ))}
      </FlexDiv>
    </FlexDiv>
  );
};

export const Reviews: React.FC<IReviews> = ({ reviews }) => {
  return (
    <Block
      title={{
        children: "Reviews",
        font: "title",
        color: "grad",
        weight: 400,
      }}
      className={styles.block}
    >
      <TextWrapper animate variant="big">
        <FlexDiv gapArray={[7, 7, 7, 8]} className={styles.reviews} width100>
          {reviews.map((review) => (
            <Review key={review.name} {...review} />
          ))}
        </FlexDiv>
      </TextWrapper>
    </Block>
  );
};
